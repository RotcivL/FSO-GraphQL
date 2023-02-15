import { gql } from '@apollo/client'

export const ALL_AUTHORS_BOOKS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
    allBooks {
      title
      author
      published
      id
    }
  }
`
