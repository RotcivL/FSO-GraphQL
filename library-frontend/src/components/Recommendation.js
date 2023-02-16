import { useQuery } from '@apollo/client'
import { FILTER_BOOKS_GENRE } from '../queries'
import BookTable from './BookTable'

const Recommendation = ({ genre }) => {
  const result = useQuery(FILTER_BOOKS_GENRE, {
    variables: { genre },
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favourite genre <b>{genre}</b>
      </p>
      <BookTable books={result.data.allBooks} />
    </div>
  )
}

export default Recommendation
