import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { ThemeProvider, useTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { mUiTheme } from '../lib/materialUiUtils'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the CSS that Material UI injected.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <ThemeProvider theme={mUiTheme}>
      <Head>
        {/* PWA primary color */}
        <meta name="theme-color" content={useTheme().palette.primary.main} />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
