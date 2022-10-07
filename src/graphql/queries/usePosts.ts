import { useRouter } from 'next/router'
import { gql } from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

import { getLanguageByLocale } from 'src/helpers/language'
import { graphQLClient } from '../client'

export const usePosts = () => {
  const { locale } = useRouter()
  const language = getLanguageByLocale(locale)

  const query = gql`
    query Posts($locale: [Locale!]!) {
      posts(locales: $locale) {
        createdAt
        date
        excerpt
        id
        publishedAt
        slug
        tags
        title
        updatedAt
        locale
      }
    }
  `

  return useQuery(['get-posts', language], async () => {
    return await graphQLClient.request(query, { locale: [language] })
  })
}
