import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodbClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const {
      title,
      description,
      year,
      highlight,
      github_url,
      research_url,
      technologies,
      team_size,
    } = req.body;

    console.log("Received POST request with body:", req.body);

    try {
      const client = await connectToDatabase();
      console.log("Connected to database");

      const database = client.db("web-portfolio");
      const collection = database.collection("project");

      const result = await collection.insertOne({
        title,
        description,
        year,
        highlight,
        github_url,
        research_url,
        technologies,
        team_size,
      });

      console.log("Inserted project details with result:", result);

      res.status(200).json({ id: result.insertedId, ...req.body });
    } catch (error) {
      console.error("Error inserting project details:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    try {
      const client = await connectToDatabase();
      console.log("Connected to database");

      const database = client.db("web-portfolio");
      const collection = database.collection("project");

      const projects = await collection.find({}).toArray();

      console.log("Fetched project details:", projects);

      res.status(200).json(projects);
    } catch (error) {
      console.error("Error fetching project details:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    console.warn(`Method ${req.method} Not Allowed`);
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
