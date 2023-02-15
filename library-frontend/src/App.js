// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import { ALL_AUTHORS_BOOKS } from './queries'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const padding = {
    padding: 5,
  }
  const result = useQuery(ALL_AUTHORS_BOOKS)

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          authors
        </Link>
        <Link style={padding} to="/books">
          books
        </Link>
        <Link style={padding} to="/add">
          add book
        </Link>
      </div>

      <Routes>
        <Route
          path="/"
          element={<Authors authors={result.data.allAuthors} />}
        />
        <Route path="/books" element={<Books books={result.data.allBooks} />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </Router>
  )
}

export default App
