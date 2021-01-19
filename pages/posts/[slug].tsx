import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
// import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from '../../component/atoms/Link'
import { getPostFromSlug, slugs } from '../../lib/mdxUtils'

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  // TestComponent: dynamic(() => import('../../components/TestComponent')),
  Head,
}

// Optionally pass remark/rehype plugins
const mdxOptions = { remarkPlugins: [], rehypePlugins: [] }

export default function PostPage({ source, frontMatter }) {
  const content = hydrate(source, { components })
  return (
    <>
      <header>
        <nav>
          <Link href="/">
            <a>👈 Go back home</a>
          </Link>
        </nav>
      </header>
      <div>
        <h1>{frontMatter.title}</h1>
        {frontMatter.description && <p>{frontMatter.description}</p>}
      </div>
      <main>{content}</main>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const { content, data } = getPostFromSlug(params.slug)

  const mdxSource = await renderToString(content, {
    components,
    // Optionally pass remark/rehype plugins
    mdxOptions,
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  }
}

export const getStaticPaths = async () => {
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}
