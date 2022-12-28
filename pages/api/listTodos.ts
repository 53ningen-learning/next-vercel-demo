// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { API, graphqlOperation } from 'aws-amplify'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Todo } from '../../src/graphql/API'
import * as queries from '../../src/graphql/queries'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<[Todo]>
) {
  const response = await API.graphql(graphqlOperation(queries.listTodos))
  if ('errors' in response) {
    throw new Error(JSON.stringify(response.errors))
  } else if (!('data' in response && response.data.listTodos)) {
    throw new Error(`invalid response: ${response}`)
  }
  const tds = response.data.listTodos.items as [Todo]
  res.status(200).json(tds)
}
