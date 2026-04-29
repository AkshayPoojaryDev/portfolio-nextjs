import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content', 'blog')

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author?: string
  readingTime: number
  content: string
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const files = fs.readdirSync(postsDirectory)
  const posts = files
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(postsDirectory, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const { data, content: body } = matter(content)

      return {
        slug: file.replace(/\.(mdx|md)$/, ''),
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        author: data.author,
        readingTime: calculateReadingTime(body),
        content: body,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(postsDirectory, `${slug}.mdx`)
  
  if (!fs.existsSync(filePath)) {
    const mdPath = path.join(postsDirectory, `${slug}.md`)
    if (!fs.existsSync(mdPath)) {
      return null
    }
  }

  const content = fs.readFileSync(
    fs.existsSync(filePath) ? filePath : path.join(postsDirectory, `${slug}.md`),
    'utf-8'
  )
  const { data, content: body } = matter(content)

  return {
    slug,
    title: data.title || 'Untitled',
    description: data.description || '',
    date: data.date || new Date().toISOString(),
    author: data.author,
    readingTime: calculateReadingTime(body),
    content: body,
  }
}

export async function getAllBlogSlugs(): Promise<string[]> {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const files = fs.readdirSync(postsDirectory)
  return files
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => file.replace(/\.(mdx|md)$/, ''))
}
