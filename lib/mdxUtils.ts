import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'posts')

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path))

interface GetPostsOptions {
  dropOrig: boolean
}

const getPostsDefaultOptions: GetPostsOptions = {
  dropOrig: true,
}

export function getPosts(options: Partial<GetPostsOptions> = {}) {
  const { dropOrig } = Object.assign(getPostsDefaultOptions, options)
  return postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
    const gmData = matter(source)

    const slug = filePath.replace(/\.mdx?$/, '')

    if (dropOrig) {
      // next.js raise error, if orig property is.
      delete gmData.orig
    }

    return {
      ...gmData,
      filePath,
      slug,
    }
  })
}
