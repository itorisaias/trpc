import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { useAnalytics } from '@happykit/analytics';

import { trpc } from 'utils/trpc';
import Header from 'components/header';

function App({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  useAnalytics({
    publicKey: process.env.NEXT_PUBLIC_ANALYTICS_ENV_KEY!,
    skipHostnames: [],
  })

  return (
    <SessionProvider session={session}>
      <Header />

      <Component {...pageProps} />
    </SessionProvider>)
}

export default trpc.withTRPC(App);
