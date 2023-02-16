import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom'

import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS_BOOKS } from './queries'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const padding = {
    padding: 5,
  }

  const [token, setToken] = useState()
  const result = useQuery(ALL_AUTHORS_BOOKS)
  const client = useApolloClient()

  useEffect(() => {
    const userToken = window.localStorage.getItem('library-user-token')
    if (userToken) {
      setToken(userToken)
    }
  }, [])

  if (result.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
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
        {token ? (
          <>
            <Link style={padding} to="/add">
              add book
            </Link>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
      </div>

      <Routes>
        <Route
          path="/"
          element={<Authors authors={result.data.allAuthors} />}
        />
        <Route path="/books" element={<Books books={result.data.allBooks} />} />
        <Route path="/add" element={<NewBook />} />
        <Route
          path="/login"
          element={
            token ? <Navigate to="/" /> : <LoginForm setToken={setToken} />
          }
        />
      </Routes>
    </Router>
  )
}

export default App
