import type { AppProps } from 'next/app'
import { Provider } from 'urql'
import '../styles/globals.css'

import { client, ssrCache } from '../lib/urql'
import { Logo, MainMenu } from '../components'

function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState)
  }

  return (
    <Provider value={client}>
      <main className="mx-auto p-2 lg:max-w-6xl lg:p-4">
        <header className="flex items-center justify-between">
          <Logo />
          <MainMenu />
        </header>
        <Component {...pageProps} />
      </main>
    </Provider>
  )
}

export default MyApp
