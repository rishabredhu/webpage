// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

const perplexity = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: 'https://api.perplexity.ai',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { message } = req.body
      const response = await perplexity.chat.completions.create({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [{ role: 'user', content: message }],
      })
      
      res.status(200).json({ reply: response.choices[0].message.content })
    } catch (error) {
      res.status(500).json({ error: 'Error processing your request' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}