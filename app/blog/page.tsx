import Link from 'next/link'
import { getBlogPosts } from '@/lib/mdx'
import { formatDate } from '@/lib/utils'

export const metadata = {
  title: 'Blog | Dev Portfolio',
  description: 'Thoughts on web development, performance, and building great products.',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20">
      <div className="container-custom">
        <div className="max-w-3xl space-y-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Thoughts on web development, performance, and building great products.
            </p>
          </div>

          <div className="space-y-8">
            {posts.length === 0 ? (
              <p className="text-slate-600 dark:text-slate-400">No posts yet. Check back soon!</p>
            ) : (
              posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block p-6 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-md dark:hover:shadow-purple-900/10 transition-all"
                >
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">{post.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <time className="text-sm text-slate-500 dark:text-slate-500">
                        {formatDate(post.date)}
                      </time>
                      <span className="text-sm text-slate-500">
                        {post.readingTime} min read
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
