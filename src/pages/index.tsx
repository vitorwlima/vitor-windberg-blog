import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Logo } from 'src/components/Logo'
import { MainMenu } from 'src/components/MainMenu'
import { usePosts } from 'src/graphql/queries/usePosts'
import { getLanguageByLocale, Languages } from 'src/helpers/language'

const Home: NextPage = () => {
  const { locale } = useRouter()
  const language = getLanguageByLocale(locale)
  const { data } = usePosts(language)

  return (
    <>
      <Head>
        <title>Vitor Windberg - Blog</title>
      </Head>

      <main className="mx-auto max-w-[1200px] py-10 px-6">
        <header className="flex items-center justify-between">
          <Logo />
          <MainMenu />
        </header>
        <h1 className="mt-10 text-xl">Post: {data?.posts?.[0].title}</h1>
      </main>
    </>
  )
}

export default Home
