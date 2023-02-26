import { API, graphqlOperation } from 'aws-amplify'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Todo } from '../../src/graphql/API'
import * as queries from '../../src/graphql/queries'
import styles from '../../styles/Home.module.css'

interface Props {
  buildDate: String
  tasks: Todo[]
}

const SSG: NextPage<Props> = ({ buildDate, tasks }: Props) => {
  const [todos, setTodos] = useState<[Todo]>()
  useEffect(() => {
    if (todos === undefined) {
      ;(async () => {
        const res = await getTodos()
        setTodos(res)
      })()
    }
  }, [todos])
  return (
    <div className={styles.container}>
      <Head>
        <title>SSG DEMO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>SSG(Static Site Generate) Demo</h1>
        <p className={styles.description}>Builded at: {buildDate}</p>
        <p className={styles.description}>Data: {JSON.stringify(tasks)}</p>

        <h1 className={styles.title}>CSR(Client Side Rendering) Demo</h1>

        <p className={styles.description}>Data: {JSON.stringify(todos)}</p>

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

export const getStaticProps: GetStaticProps<Props> = async () => {
  const tasks = await getTodos()
  const props: Props = {
    tasks,
    buildDate: new Date().toLocaleString('ja-JP'),
  }
  return {
    props,
  }
}

export default SSG

const getTodos = async () => {
  const res = await API.graphql(graphqlOperation(queries.listTodos))
  if ('errors' in res) {
    throw new Error(JSON.stringify(res.errors))
  } else if (!('data' in res && res.data.listTodos)) {
    throw new Error(`invalid response: ${res}`)
  } else {
    const tds = res.data.listTodos.items as [Todo]
    return tds
  }
}
