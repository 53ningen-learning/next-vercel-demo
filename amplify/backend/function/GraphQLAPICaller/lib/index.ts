/* Amplify Params - DO NOT EDIT
	API_NEXTVERCELDEMO_GRAPHQLAPIENDPOINTOUTPUT
	API_NEXTVERCELDEMO_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import AWSAppSyncClient from 'aws-appsync'
import fetch from 'cross-fetch'
import gql from 'graphql-tag'
import { Todo } from './graphql/API'
import * as queries from './graphql/queries'

global.fetch = fetch

const cli = new AWSAppSyncClient(
  {
    url: process.env.API_NEXTVERCELDEMO_GRAPHQLAPIENDPOINTOUTPUT,
    region: process.env.REGION,
    auth: {
      type: 'AWS_IAM',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN,
      },
    },
    disableOffline: true,
  },
  { defaultOptions: { query: { fetchPolicy: 'no-cache' } } }
)

exports.handler = async (_: any) => {
  try {
    const res = await cli.query({
      query: gql(queries.listTodos),
    })
    console.log(JSON.stringify(res))

    if (res.errors || !('data' in res && res.data)) {
      console.log(JSON.stringify(res))
      throw new Error(res as any)
    } else {
      const todos = (res.data as any).listTodos.items as [Todo]
      return {
        statusCode: 200,
        todos,
      }
    }
  } catch (e) {
    return {
      statusCode: 500,
      error: JSON.stringify(e),
    }
  }
}
