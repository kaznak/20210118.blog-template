import Checkbox from '@material-ui/core/Checkbox'
import Divider from '@material-ui/core/Divider'
import Paper, { PaperProps } from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography, { TypographyProps } from '@material-ui/core/Typography'

import CodeBlock from 'react-syntax-highlighter'
// !!TODO!! error on style object loading.
// import { prism as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Link from '../component/atoms/Link'
import Image from 'next/image'
import Head from 'next/head'

// Optionally pass remark/rehype plugins
export const mdxOptions = { remarkPlugins: [], rehypePlugins: [] }

export const components = {
  p: Typography,
  h1: (props: TypographyProps) => <Typography {...props} variant="h1" />,
  h2: (props: TypographyProps) => <Typography {...props} variant="h2" />,
  h3: (props: TypographyProps) => <Typography {...props} variant="h3" />,
  h4: (props: TypographyProps) => <Typography {...props} variant="h4" />,
  h5: (props: TypographyProps) => <Typography {...props} variant="h5" />,
  h6: (props: TypographyProps) => <Typography {...props} variant="h6" />,
  blockquote: (props: PaperProps) => (
    <Paper style={{ borderLeft: '4px solid grey', padding: 8 }} {...props} />
  ),
  ul: (props: TypographyProps) => <Typography {...props} component="ul" />,
  ol: (props: TypographyProps) => <Typography {...props} component="ol" />,
  li: (props: TypographyProps) => <Typography {...props} component="li" />,
  table: (props) => <Table {...props} />,
  thead: (props) => <TableHead {...props} />,
  tbody: (props) => <TableBody {...props} />,
  tr: (props) => <TableRow {...props} />,
  td: ({ align, ...props }) => (
    <TableCell align={align || undefined} {...props} />
  ),
  th: ({ align, ...props }) => (
    <TableCell align={align || undefined} {...props} />
  ),
  code: ({ className, children }) => (
    <CodeBlock language={className.replace(/^language-/, '')}>
      {children}
    </CodeBlock>
  ),
  // inlineCode:
  // pre: ({ lang, meta }) => new CodeBlock({ language: lang, ...meta }),
  // em:
  // strong:
  // del:
  hr: Divider,
  a: Link,
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  img: ({ src, alt, title }: { src: string; alt: string; title: string }) => {
    // use title attribute as optional attribute
    // https://developer.mozilla.org/ja/docs/Web/HTML/Element/img#the_title_attribute
    // !!TODO!! next/image render div element, but MDX encupsule texts in p element, then cause error.
    return <Image src={src} alt={alt} {...JSON.parse(title)} />
  },
  /* extend */
  input: (props) => {
    const { type } = props
    if (type === 'checkbox') {
      return <Checkbox {...props} disabled={false} readOnly={true} />
    }
    return <input {...props} />
  },
  wrapper: (props) => <div {...props} className="markdown-body" />,
  head: Head,
}

export default components
