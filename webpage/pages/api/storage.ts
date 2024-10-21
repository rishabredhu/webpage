import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodbClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.debug("Request method:", req.method);

  if (req.method === "GET") {
    try {
      console.debug("Connecting to database...");
      const client = await connectToDatabase();
      console.debug("Connected to database");

      const db = client.db("web-portfolio");
      console.debug("Selected database:", db.databaseName);

      const collection = db.collection("project");
      console.debug("Selected collection:", collection.collectionName);

      console.debug("Fetching projects from collection...");
      const projects = await collection.find({}).toArray();
      // console.debug('Fetched projects:', projects);

      // Send success response
      res.status(200).json(projects);
    } catch (error) {
      // Check if it's a connection error
      if (error instanceof Error && error.name === "MongoNetworkError") {
        console.error("Database connection error:", error);
        res.status(503).json({ error: "Service Unavailable" });
      } else {
        console.error("Error fetching project details:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  } else {
    console.debug("Invalid request method:", req.method);
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
