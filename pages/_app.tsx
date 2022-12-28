import { Amplify } from 'aws-amplify'
import type { AppProps } from 'next/app'
import awsExports from '../src/aws-exports'
import '../styles/globals.css'

Amplify.configure({ ...awsExports })

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
