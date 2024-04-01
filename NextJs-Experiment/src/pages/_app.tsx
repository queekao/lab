import { ReactElement, Suspense } from 'react'
import './globals.css'
import type { AppProps } from 'next/app'
import {
  StyledEngineProvider,
  Backdrop,
  CircularProgress,
  ThemeProvider
} from '@mui/material'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { theme } from '../themes'

export default function App({ pageProps }: AppProps): ReactElement {
  const { pathname } = useRouter()
  const AnyComponent = dynamic(
    () => {
      if (pathname === '/recordrtc') {
        return import('./recordrtc')
      } else if (pathname === '/') {
        return import('./index')
      } else {
        // Default to NotFound component if neither condition is met
        return import('./notfound')
      }
    },
    {
      loading: () => (
        <Backdrop
          sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ),
      suspense: true // Set to false unless your components are designed to work with React Suspense
    }
  )

  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme()}>
          <Suspense>
            <AnyComponent {...pageProps} />
          </Suspense>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  )
}
