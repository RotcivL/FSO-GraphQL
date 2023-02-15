import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS_BOOKS, EDIT_YEAR } from '../queries'
import Select from 'react-select'

const Authors = ({ authors }) => {
  const [year, setYear] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const options = authors.map((a) => {
    const option = { value: a.name, label: a.name }
    return option
  })

  const [updatedAuthor] = useMutation(EDIT_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS_BOOKS }],
  })

  const submit = async (event) => {
    event.preventDefault()
    updatedAuthor({
      variables: { name: selectedOption.value, setBornTo: Number(year) },
    })
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
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>
          born
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
