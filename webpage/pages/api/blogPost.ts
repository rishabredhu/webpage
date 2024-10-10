import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { slug } = req.query;

  if (req.method === "GET") {
    // Fetch a specific post by its slug
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) return res.status(500).json({ error: error.message });
    if (!data) return res.status(404).json({ error: "Post not found" });
    return res.status(200).json(data);
  } else if (req.method === "PUT") {
    // Update an existing blog post (authenticated users)
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const { title, content, tags, excerpt, featured_image_url } = req.body;
    const { data, error } = await supabase
      .from("blog_posts")
      .update({ title, content, tags, excerpt, featured_image_url })
      .eq("slug", slug);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  } else if (req.method === "DELETE") {
    // Delete a blog post (authenticated users)
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("slug", slug);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(204).end();
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
