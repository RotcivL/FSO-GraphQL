// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from './queries'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const padding = {
    padding: 5,
  }
  const authorResult = useQuery(ALL_AUTHORS)

  if (authorResult.loading) {
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
          element={<Authors authors={authorResult.data.allAuthors} />}
        />
        <Route path="/books" element={<Books books={[]} />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </Router>
  )
}

export default App
