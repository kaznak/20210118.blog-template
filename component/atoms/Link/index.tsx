import { ReactNode } from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link'

export interface LinkProps extends NextLinkProps {
  muiLinkProps?: MuiLinkProps
  children?: ReactNode
}

export function Link(props: LinkProps) {
  return (
    <NextLink {...props}>
      <MuiLink {...props.muiLinkProps}>{props.children}</MuiLink>
    </NextLink>
  )
}
export default Link
