import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      return getTestimonials(req, res);
    case "POST":
      return createTestimonial(req, res);
    case "PUT":
      return updateTestimonial(req, res);
    case "DELETE":
      return deleteTestimonial(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// GET all testimonials
async function getTestimonials(req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json(data);
}

// POST a new testimonial
async function createTestimonial(req: NextApiRequest, res: NextApiResponse) {
  const { quote, author_name, author_title, company, author_image_url } =
    req.body;

  const { data, error } = await supabase
    .from("testimonials")
    .insert({ quote, author_name, author_title, company, author_image_url });

  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json(data);
}

// PUT (update) a testimonial
async function updateTestimonial(req: NextApiRequest, res: NextApiResponse) {
  const { id, quote, author_name, author_title, company, author_image_url } =
    req.body;

  const { data, error } = await supabase
    .from("testimonials")
    .update({ quote, author_name, author_title, company, author_image_url })
    .eq("id", id);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json(data);
}

// DELETE a testimonial
async function deleteTestimonial(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const { error } = await supabase.from("testimonials").delete().eq("id", id);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(204).end();
}
