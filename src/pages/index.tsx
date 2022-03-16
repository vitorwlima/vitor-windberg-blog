import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

import {
  AllPostsDocument,
  Languages,
  useAllPostsQuery,
} from '../graphql/generated/graphql'
import { getLanguageByLocale, useLanguage } from '../hooks/useLanguage'
import { client, ssrCache } from '../lib/urql'

const Home: NextPage = () => {
  const { language } = useLanguage()
  const [{ data, error, fetching }] = useAllPostsQuery({
    variables: {
      language,
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

      <div className="mt-24" />
      {data?.posts.map((post) => (
        <p>
          {post.title} - {post.language}
        </p>
      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const language = getLanguageByLocale(locale)
  await client.query(AllPostsDocument, { language }).toPromise()

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  }
}

export default Home
