import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

type HomeProps = {
  envTest: string
}

const Home: NextPage<HomeProps> = ({ envTest }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js + Vercel DEMO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <p className={styles.description}>TypeScript/Next.js + Vercel DEMO</p>
        <div className={styles.grid}>
          <Link href="/ssg" passHref>
            <a>
              <h2>SSG DEMO &rarr;</h2>
              <p>Static Site Generation DEMO</p>
            </a>
          </Link>

          <Link href="/ssr" passHref>
            <a>
              <h2>SSR DEMO &rarr;</h2>
              <p>Server-Side Rendering DEMO</p>
            </a>
          </Link>

          <Link href="/isr" passHref>
            <a>
              <h2>ISR DEMO &rarr;</h2>
              <p>Incremental Static Regeneration DEMO</p>
            </a>
          </Link>

          <a href="./api/hello" target="_blank">
            <h2>API DEMO &rarr;</h2>
            <p>API DEMO</p>
          </a>

          <a href="#">
            <h2>Environment Variable DEMO</h2>
            <p>ENV_TEST: {envTest}</p>
          </a>

          <a
            href="https://github.com/53ningen-learning/next-vercel-demo"
            target="_blank"
            rel="noopener noreferrer">
            <h2>GitHub Repository &rarr;</h2>
            <p>53ningen-learning/next-vercel-demo</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://53ningen.com"
          target="_blank"
          rel="noopener noreferrer">
          53ningen.com
        </a>
      </footer>
    </div>
  )
}

export const getStaticProps = async () => {
  return {
    props: {
      envTest: process.env.NEXT_PUBLIC_ENV_TEST ?? 'undefined',
    },
  }
}

export default Home
