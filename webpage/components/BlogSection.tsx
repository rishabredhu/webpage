import { Octokit } from 'octokit'
import { MDXRemote } from 'next-mdx-remote/rsc'
import matter from 'gray-matter'
import Link from 'next/link'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

async function fetchMdContent(slug: string) {
  try {
    const response = await octokit.rest.repos.getContent({
      owner: 'your-github-username',
      repo: 'your-blog-repo',
      path: `posts/${slug}.md`,
    })

    if ('content' in response.data) {
      const decodedContent = Buffer.from(response.data.content, 'base64').toString('utf-8')
      const { content, data } = matter(decodedContent)
      return { content, frontmatter: data }
    } else {
      throw new Error('Content not found')
    }
  } catch (error) {
    console.error('Error fetching content:', error)
    return null
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await fetchMdContent(params.slug)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 font-mono">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 pixelated">Rishab&apos;s Blog</h1>
        <nav>
          <Link href="/" className="text-blue-400 hover:underline mr-4">Home</Link>
          <Link href="/experience" className="text-blue-400 hover:underline mr-4">Experience</Link>
          <Link href="/projects" className="text-blue-400 hover:underline">Projects</Link>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto">
        <article className="bg-gray-900 p-6 rounded-lg shadow-lg mb-8 border-2 border-white">
          <h2 className="text-3xl font-bold mb-4 pixelated">{post.frontmatter.title}</h2>
          <div className="text-gray-400 mb-4">Posted on {post.frontmatter.date}</div>
          <div className="prose prose-invert max-w-none">
            <MDXRemote source={post.content} />
          </div>
        </article>

        <div className="bg-gray-900 p-6 rounded-lg shadow-lg border-2 border-white">
          <h3 className="text-2xl font-bold mb-4 pixelated">Recent Posts</h3>
          <ul className="space-y-2">
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

     

      <style jsx global>{`
        .pixelated {
          font-family: 'Press Start 2P', cursive;
          text-shadow: 2px 2px 0px #000000;
        }
      `}</style>
    </div>
  )
}