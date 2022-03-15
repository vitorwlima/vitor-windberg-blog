import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'

import {
  AllPostsDocument,
  Languages,
  useAllPostsQuery,
} from '../graphql/generated/graphql'
import { client, ssrCache } from '../lib/urql'

const Home: NextPage = () => {
  const [{ data, error, fetching }] = useAllPostsQuery({
    variables: {
      language: Languages.English,
    },
  })

  if (error) return <div>Um erro ocorreu.</div>
  if (fetching) return <div>Carregando</div>

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-4xl font-bold text-blue-500">Hello World</h1>
      <h2>{data?.posts[0].title}</h2>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  await client
    .query(AllPostsDocument, { language: Languages.English })
    .toPromise()
  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  }
}

export default Home
