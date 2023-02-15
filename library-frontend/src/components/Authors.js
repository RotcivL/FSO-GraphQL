import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS_BOOKS, EDIT_YEAR } from '../queries'
const Authors = ({ authors }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [updatedAuthor] = useMutation(EDIT_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS_BOOKS }],
  })

  const submit = async (event) => {
    event.preventDefault()
    updatedAuthor({ variables: { name, setBornTo: Number(year) } })
    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          boirn
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
