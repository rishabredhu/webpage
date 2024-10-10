import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (req.method === "GET") {
    // Fetch a specific project
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return res.status(500).json({ error: error.message });
    if (!data) return res.status(404).json({ error: "Project not found" });
    return res.status(200).json(data);
  } else if (req.method === "PUT") {
    // Update a project (authenticated users)
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const {
      title,
      description,
      technologies,
      github_url,
      demo_url,
      image_url,
    } = req.body;
    const { data, error } = await supabase
      .from("projects")
      .update({
        title,
        description,
        technologies,
        github_url,
        demo_url,
        image_url,
      })
      .eq("id", id);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  } else if (req.method === "DELETE") {
    // Delete a project (authenticated users)
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(204).end();
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
