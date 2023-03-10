import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom'

import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import {
  ALL_AUTHORS,
  ALL_BOOKS,
  BOOK_ADDED,
  CURRENT_USER,
  FILTER_BOOKS_GENRE,
} from './queries'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommedation from './components/Recommendation'

const App = () => {
  const padding = {
    padding: 5,
  }

  const [token, setToken] = useState()
  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)
  const resultMe = useQuery(CURRENT_USER, {
    skip: !token,
  })
  const client = useApolloClient()

  useEffect(() => {
    const userToken = window.localStorage.getItem('library-user-token')
    if (userToken) {
      setToken(userToken)
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`new book ${addedBook.title} added`)
      const genres = addedBook.genres

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })

      genres.forEach((genre) => {
        try {
          client.cache.updateQuery(
            { query: FILTER_BOOKS_GENRE, variables: { genre } },
            ({ allBooks }) => {
              return {
                allBooks: allBooks.concat(addedBook),
              }
            }
          )
        } catch (error) {
          console.log('data has not been loaded yet')
        }
      })
    },
  })

  if (resultAuthors.loading || resultBooks.loading) {
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
            <Link style={padding} to="/recommendations">
              recommend
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
          element={<Authors authors={resultAuthors.data.allAuthors} />}
        />
        <Route
          path="/books"
          element={<Books books={resultBooks.data.allBooks} />}
        />
        <Route
          path="/add"
          element={token ? <NewBook /> : <Navigate to="/login" />}
        />
        <Route
          path="/recommendations"
          element={
            token ? (
              <Recommedation genre={resultMe.data?.me.favouriteGenre} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
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
