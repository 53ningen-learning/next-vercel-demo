import { API, graphqlOperation } from 'aws-amplify'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { Todo } from '../src/graphql/API'
import { listTodos } from '../src/graphql/queries'

type Props = {
  todos: Todo[]
}

const Page = ({ todos }: Props) => {
  return <>{JSON.stringify(todos)}</>
}

export default Page

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['hoge', 'fuga'].map((slug) => ({
      params: { slug },
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string }
  const todos = await getTodos()
  if (slug !== 'piyo') {
    return {
      props: {
        todos,
      },
    }
  } else {
    return {
      notFound: true,
    }
  }
}

const getTodos = async () => {
  const res = await API.graphql(graphqlOperation(listTodos))
  if ('errors' in res) {
    throw new Error(JSON.stringify(res.errors))
  } else if (!('data' in res && res.data.listTodos)) {
    throw new Error(`invalid response: ${res}`)
  } else {
    const tds = res.data.listTodos.items as [Todo]
    return tds
  }
}
