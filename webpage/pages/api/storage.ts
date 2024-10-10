// import { NextApiRequest, NextApiResponse } from 'next'
// import { supabase } from '@/lib/supabaseClient'

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   switch (req.method) {
//     case 'POST':
//       return uploadFile(req, res)
//     case 'GET':
//       return getFile(req, res)
//     default:
//       res.setHeader('Allow', ['POST', 'GET'])
//       res.status(405).end(`Method ${req.method} Not Allowed`)
//   }
// }

// // POST: Upload a file to Supabase Storage
// async function uploadFile(req: NextApiRequest, res: NextApiResponse) {
//   const { file, bucket } = req.body

//   const { data, error } = await supabase
//     .storage
//     .from(bucket)
//     .upload(`public/${file.name}`, file)

//   if (error) return res.status(500).json({ error: error.message })
//   return res.status(200).json(data)
// }

// // GET: Retrieve file URL from Supabase Storage
// async function getFile(req: NextApiRequest, res: NextApiResponse) {
//   const { bucket, fileName } = req.query

//   const { data, error } = supabase
//     .storage
//     .from(bucket)

//   const publicUrl = data?.publicUrl

//   if (error) return res.status(500).json({ error: error.message })
//   return res.status(200).json({ url: publicUrl })
// }
