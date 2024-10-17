// Import necessary modules and libraries
import { Octokit } from 'octokit' // Octokit is a GitHub API client for JavaScript
import { MDXRemote } from 'next-mdx-remote/rsc' // MDXRemote allows rendering MDX content remotely
import matter from 'gray-matter' // gray-matter is used to parse frontmatter from markdown files
import Link from 'next/link' // Link is a component for client-side navigation in Next.js
import Cube from "@/components/ui/3D-UI/cube"





// Initialize Octokit with the GitHub token from environment variables
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

/**
 * Asynchronously fetches the markdown content of a blog post from a GitHub repository.
 * @param {string} identifier - The unique identifier for the blog post, typically derived from the filename.
 * @returns {Promise<{ content: string, frontmatter: object } | null>} - Returns the content and frontmatter if successful, otherwise null.
 */
async function fetchMdContent(identifier: string) {
  try {
    // Make a request to the GitHub API to get the content of the specified markdown file
    const response = await octokit.rest.repos.getContent({
      owner: 'rishabredhu', // GitHub username of the repository owner
      repo: 'Blogs', // Repository name where the blog posts are stored
      path: `posts/${identifier}.md`, // Path to the specific markdown file within the repository
    })

    // Check if the response contains the 'content' field
    if ('content' in response.data) {
      // Decode the base64 encoded content returned by GitHub
      const decodedContent = Buffer.from(response.data.content, 'base64').toString('utf-8')
      // Use gray-matter to separate the frontmatter (metadata) from the markdown content
      const { content, data } = matter(decodedContent)
      return { content, frontmatter: data } // Return the parsed content and frontmatter
    } else {
      // If 'content' is not found in the response, throw an error
      throw new Error('Content not found')
    }
  } catch (error) {
    // Log any errors that occur during the fetch process
    console.error('Error fetching content:', error)
    return null // Return null to indicate that fetching failed
  }
}

/**
 * React component to display a single blog post.
 * @returns {JSX.Element} - The rendered blog post or an error message.
 */
export default async function BlogPost() {
  // Define the identifier for the blog post
  const identifier = 'first-post' // Replace with your actual identifier

  // Fetch the blog post data using the provided identifier
  const post = await fetchMdContent(identifier)

  // If fetching the post failed, display an error message
  if (!post) {
    return <div>Post not found</div>
  }

  // Render the blog post content
  return (
    <div className="min-h-screen bg-black text-white p-8 font-mono">
      {/* Header section containing the blog title and navigation links */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 pixelated">Rishab&apos;s Blog</h1>
        <nav>
          {/* Navigation links to different sections of the website */}
          <Link href="/" className="text-blue-400 hover:underline mr-4">Home</Link>
        </nav>
      </header>

      {/* Main content area where the blog post and recent posts are displayed */}
      <main className="max-w-3xl mx-auto">
        {/* Article section displaying the blog post */}
        <article className="bg-gray-900 p-6 rounded-lg shadow-lg mb-8 border-2 border-white">
          {/* Title of the blog post from frontmatter */}
          <h2 className="text-3xl font-bold mb-4 pixelated">{post.frontmatter.title}</h2>
          {/* Publication date of the blog post from frontmatter */}
          <div className="text-gray-400 mb-4">Posted on {post.frontmatter.date}</div>
          {/* Render the markdown content of the blog post */}
          <div className="prose prose-invert max-w-none">
            <MDXRemote source={post.content} />
          </div>
        </article>

        {/* Section displaying a list of recent blog posts */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg border-2 border-white">
          <h3 className="text-2xl font-bold mb-4 pixelated">Recent Posts</h3>
          <ul className="space-y-2">
            {/* List items with links to recent blog posts */}
            <li>
              <Link href="/blog/optimizing-react" className="text-blue-400 hover:underline">Optimizing React Applications for Performance</Link>
            </li>
            <li>
              <Link href="/blog/agentic-ui-experience" className="text-blue-400 hover:underline">HCI and Agentic UI</Link>
            </li>
            <li>
              <Link href="/blog/ai-in-software-dev" className="text-blue-400 hover:underline">The Future of AI in Software Development</Link>
            </li>
          </ul>
        </div>
      </main>

      <Cube />

      {/* Global styles specific to this component */}
      <style jsx global>{`
        .pixelated {
          font-family: 'Press Start 2P', cursive; /* Font style for pixelated text */
          text-shadow: 2px 2px 0px #000000; /* Adds a shadow effect to the text */
        }
      `}</style>
    </div>
  )
}

