import type { AppProps } from 'next/app'
import { Provider } from 'urql'

import 'src/styles/globals.css'
import { client, ssrCache } from 'src/lib/urql'
import { Logo, MainMenu } from 'src/components'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState)
  }

  return (
    <Provider value={client}>
      <main className="mx-auto p-2 lg:max-w-6xl lg:p-4">
        <header className="flex items-center justify-between">
          <button onClick={() => router.push('/')}>
            <Logo />
          </button>
          <MainMenu />
        </header>
        <Component {...pageProps} />
      </main>
    </Provider>
  )
}

export default MyApp
