import { API, graphqlOperation } from 'aws-amplify'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Todo } from '../../src/graphql/API'
import * as queries from '../../src/graphql/queries'
import styles from '../../styles/Home.module.css'
interface Props {
  buildDate: String
  data: String
}

const SSR: NextPage<Props> = ({ buildDate, data }: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SSR DEMO</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>SSR(Server-side Rendering) DEMO</h1>
        <p className={styles.description}>Builded at: {buildDate}</p>
        <p className={styles.description}>Data: {data}</p>
        <h2 className={styles.description}>
          <Link href="/">&larr; HOME</Link>
        </h2>
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

export async function getServerSideProps() {
  const res = await API.graphql(graphqlOperation(queries.listTodos))
  if ('errors' in res) {
    throw new Error(JSON.stringify(res.errors))
  } else if (!('data' in res && res.data.listTodos)) {
    throw new Error(`invalid response: ${res}`)
  }
  const tds = res.data.listTodos.items as [Todo]
  const props: Props = {
    buildDate: new Date().toLocaleString('ja-JP'),
    data: JSON.stringify(tds),
  }
  return {
    props,
  }
}

export default SSR
