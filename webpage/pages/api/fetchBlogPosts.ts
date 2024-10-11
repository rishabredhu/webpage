import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from "../../lib/mongodbClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const client = await connectToDatabase();
      const database = client.db("web-portfolio");
      const collection = database.collection("blog");

      const data = await collection
        .find({})
        .sort({ published_at: -1 })
        .project({ _id: 1, title: 1, excerpt: 1, slug: 1 })
        .toArray();

      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
