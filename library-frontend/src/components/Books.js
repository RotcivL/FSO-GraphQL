import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { FILTER_BOOKS_GENRE } from '../queries'

const BookTable = ({ books }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books.map((b) => (
          <tr key={b.id}>
            <td>{b.title}</td>
            <td>{b.author.name}</td>
            <td>{b.published}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

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
