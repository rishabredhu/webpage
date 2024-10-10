// import { NextApiRequest, NextApiResponse } from 'next';

// // Import your OpenAI client setup here
// // import { openaiClient } from 'path-to-your-openai-client-setup';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { message } = req.body;

//     try {
//       // Replace with actual OpenAI API call
//       const response = await openaiClient.createCompletion({
//         model: 'gpt-4',
//         prompt: message,
//         max_tokens: 150,
//       });

//       const reply = response.data.choices[0].text.trim();
//       res.status(200).json({ reply });
//     } catch (error) {
//       console.error('Error communicating with OpenAI:', error);
//       res.status(500).json({ error: 'Failed to get response from OpenAI' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
