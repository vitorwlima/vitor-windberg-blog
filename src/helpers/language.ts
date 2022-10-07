import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

enum Languages {
  Portuguese = 'portuguese',
  English = 'english',
}

const getLanguageByLocale = (language?: string): Languages => {
  if (language === 'pt-BR') return Languages.Portuguese
  return Languages.English
}

const getLocaleByLanguage = (language: Languages): string => {
  if (language === Languages.Portuguese) return 'pt-BR'
  return 'en-US'
}

const useLanguage = () => {
  const { locale, push, asPath } = useRouter()
  const [_, setCookie] = useCookies(['NEXT_LOCALE'])

  const language = getLanguageByLocale(locale)

  const languages = [
    {
      image: '/brazil.svg',
      label: 'Português',
      value: Languages.Portuguese,
      active: language === Languages.Portuguese,
    },
    {
      image: '/united_states.svg',
      label: 'English',
      value: Languages.English,
      active: language === Languages.English,
    },
  ]

  const switchLanguage = () => {
    const value = [Languages.Portuguese, Languages.English].find(
      (l) => l !== language,
    )!

    const cookieValue = getLocaleByLanguage(value)
    setCookie('NEXT_LOCALE', cookieValue)
    push(asPath, undefined, { locale: cookieValue })
  }

  return { language, languages, switchLanguage }
}

export { useLanguage, getLanguageByLocale }
