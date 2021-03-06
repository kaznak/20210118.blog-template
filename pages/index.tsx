import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Link from '../component/atoms/Link'

import { posts } from '../lib/mdxUtils'

export function Index({ posts }) {
  return (
    <>
      <Typography variant="h1">Home Page</Typography>
      <Typography>
        Click the link below to navigate to a page generated by{' '}
        <code>next-mdx-remote</code>.
      </Typography>
      <List>
        {posts.map((post) => (
          <ListItem key={post.slug}>
            <Link as={`/posts/${post.slug}`} href={`/posts/[slug]`}>
              {post.data.title}
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export function getStaticProps() {
  return { props: { posts } }
}

export default Index
