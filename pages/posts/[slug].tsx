import { getPostFromSlug, slugs } from '../../lib/mdxUtils'

import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Link from '../../component/atoms/Link'

import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import { components, mdxOptions } from '../../lib/mdxMapping'

export default function PostPage({ source, frontMatter }) {
  const content = hydrate(source, { components })
  return (
    <Container>
      <Box component="header">
        <Box component="nav">
          <Link href="/">👈 Go back home</Link>
        </Box>
      </Box>
      <Box>
        <Typography variant="h1">{frontMatter.title}</Typography>
        {frontMatter.description && (
          <Typography>{frontMatter.description}</Typography>
        )}
      </Box>
      <Box py={10} component="main">{content}</Box>
    </Container>
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
