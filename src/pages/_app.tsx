import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { trpc } from '../utils/trpc';
import Header from '../components/header';

function App({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Header />

      <Component {...pageProps} />
    </SessionProvider>)
}

export default trpc.withTRPC(App);
