import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

import { Languages } from 'src/graphql/generated/graphql'

const getLanguageByLocale = (language?: string): Languages => {
  if (language === 'pt-BR') return Languages.Portuguese
  return Languages.English
}

const getLocaleByLanguage = (language: Languages): string => {
  if (language === Languages.Portuguese) return 'pt-BR'
  return 'en-US'
}

const useLanguage = () => {
  const { locale } = useRouter()
  const [_, setCookie] = useCookies(['NEXT_LOCALE'])

  const language = getLanguageByLocale(locale)
  const setLanguage = (value: Languages) => {
    const cookieValue = getLocaleByLanguage(value)
    setCookie('NEXT_LOCALE', cookieValue)
  }

  return { language, setLanguage }
}

export { useLanguage, getLanguageByLocale }
