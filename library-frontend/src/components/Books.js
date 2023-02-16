import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { FILTER_BOOKS_GENRE } from '../queries'
import BookTable from './BookTable'

const Books = ({ books }) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(FILTER_BOOKS_GENRE, {
    variables: { genre },
    skip: !genre,
  })

  const genresSet = new Set(
    books.reduce((arr, book) => arr.concat(book.genres), [])
  )

  const genres = Array.from(genresSet)

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <b>{genre ? genre : 'all genres'}</b>
      </p>
      <BookTable books={genre ? result.data.allBooks : books} />
      <div>
        {genres.map((genre, index) => (
          <button key={index} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
