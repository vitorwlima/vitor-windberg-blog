import type { NextPage } from 'next'
import Head from 'next/head'
import { useQuery } from 'urql'

import { client, ssrCache } from '../lib/urql'

const AllPostsQuery = `
  query {
    posts(where: {
      status: {
        equals: "published"
      }
    }) {
      id
      title
      slug
      status
      content {
        document
      }
      publishDate
    }
  }
`

const Home: NextPage = () => {
  const [result] = useQuery({ query: AllPostsQuery })
  const { data, fetching, error } = result

  if (fetching) return <div>Loading...</div>
  if (error) return <div>Um erro ocorreu.</div>

  console.log({ data })
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-4xl font-bold text-blue-500">Hello World</h1>
    </div>
  )
}

export const getStaticProps = async () => {
  await client.query(AllPostsQuery).toPromise()
  return { props: { urqlState: ssrCache.extractData() } }
}

export default Home
