import type { GetServerSideProps, NextPage } from 'next'
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
      language: Languages.Portuguese,
    },
  })

  if (error) return <div>Um erro ocorreu.</div>
  if (fetching) return <div>Carregando</div>

  return (
    <div className="flex flex-col">
      <Head>
        <title>Jovem Dev - Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  await client
    .query(AllPostsDocument, { language: Languages.Portuguese })
    .toPromise()

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  }
}

export default Home
