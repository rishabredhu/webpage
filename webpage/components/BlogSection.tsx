"use client"; // Ensure this is a client component if it handles interactivity

import React, { useEffect, useState } from "react";
import ErrorBoundary from "./ErrorBoundary"; // Import ErrorBoundary
import { Button } from "@/components/ui/button"; // Import Button component

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
}

const BlogSection: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blogPosts');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        setError("Failed to fetch blog posts");
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <ErrorBoundary fallback={<FallbackComponent />}>
      <section className="blog bg-white py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4">Blog</h2>
          {error && <p className="text-red-500">{error}</p>}
          {/* <div className="space-y-4">
            {blogPosts.map((post) => (
              <div key={post._id} className="p-4 border rounded-lg">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-sm">{post.excerpt}</p>
                <a
                  href={`/blog/${post.slug}`}
                  className="text-blue-500 hover:underline"
                >
                  Read more
                </a>
              </div>
            ))}
          </div> */}
          <Button
            onClick={() => window.open("/blog", "_blank")}
            className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all duration-150 ease-in-out"
          >
            <span className="text-xs pixelated">COMING SOON</span>
          </Button>
        </div>
      </section>
    </ErrorBoundary>
  );
};

const FallbackComponent: React.FC = () => (
  <div className="flex items-center justify-center h-full w-full bg-gray-200 text-gray-800">
    <p className="text-center pixelated">
      Oops! Something went wrong with the blog section.
      <br />
      Please try refreshing the page.
    </p>
  </div>
);

export default BlogSection;
