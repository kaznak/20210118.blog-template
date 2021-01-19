import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// POSTS_PATH is useful when you want to get the path to a specific file
const POSTS_PATH = path.join(process.cwd(), 'posts')

interface GetPostsOptions {
  dropOrig: boolean
  postsPath: string
}

const getPostsDefaultOptions: GetPostsOptions = {
  dropOrig: true,
  postsPath: POSTS_PATH,
}

function getPostFilePaths(options: Partial<GetPostsOptions> = {}) {
  const { postsPath } = Object.assign(getPostsDefaultOptions, options)
  return (
    fs
      .readdirSync(postsPath)
      // Only include md(x) files
      .filter((path) => /\.mdx?$/.test(path))
  )
}

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
const postFilePaths = getPostFilePaths()

const baseNameToSlug = (baseName: string) => baseName.replace(/\.mdx?$/, '')

function getPost(baseName: string, options: Partial<GetPostsOptions> = {}) {
  const { dropOrig, postsPath } = Object.assign(getPostsDefaultOptions, options)

  const source = fs.readFileSync(path.join(postsPath, baseName))
  const gmData = matter(source)

  if (dropOrig) {
    // next.js raise error, if orig property is.
    delete gmData.orig
  }

  const slug = baseNameToSlug(baseName)

  return {
    ...gmData,
    slug,
  }
}

export function getPostFromSlug(
  slug: string,
  options?: Partial<GetPostsOptions>
) {
  return getPost(`${slug}.mdx`, options)
}

function getPosts(options?: Partial<GetPostsOptions>) {
  return getPostFilePaths(options).map((filePath) => getPost(filePath, options))
}
export const posts = postFilePaths.map(getPost)

function getSlugs(options?: Partial<GetPostsOptions>) {
  return getPostFilePaths(options).map(baseNameToSlug)
}
export const slugs = postFilePaths.map(baseNameToSlug)
