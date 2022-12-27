/** @format */

import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import loginService from './services/login'
import './index.css'

import Blog from './components/Blog'
// import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Home from './components/Home'

import { initializeBlogs } from './reducers/blogreducer'
import { setMessage } from './reducers/notificationreducer'
import { setUser } from './reducers/userreducer'
import { initializeUsers } from './reducers/usersReducer'

import {
  createBlog,
  updateBlog,
  deleteBlog,
  addComment,
} from './reducers/blogreducer'

// import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Navbar from './components/Navbar'
import Login from './components/Login'
import { Grid } from '@mui/material'
import CreateBlog from './components/CreateBlog'

const App = () => {
  // const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)

  // Ref for Togglable
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  const handleUsername = (event) => {
    event.preventDefault()

    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    event.preventDefault()

    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      dispatch(setUser(user))

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

      // setUser(user)
      setUsername('')
      setPassword('')

      // Success Notification
      dispatch(
        setMessage({
          message: `Welcome ${user.name}`,
          messageState: 'success',
        })
      )
    } catch (exception) {
      dispatch(setUser(null))

      setUsername('')
      setPassword('')

      // Error Notification
      dispatch(
        setMessage({
          message: 'Wrong username or password',
          messageState: 'error',
        })
      )
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedBlogUser')

    // Success Notification

    dispatch(
      setMessage({
        message: 'Logged out',
        messageState: 'success',
      })
    )
  }

  const handleBlogCreation = async (blogObject) => {
    try {
      dispatch(createBlog(blogObject, user.token))

      // Success Notification
      dispatch(
        setMessage({
          message: `A new blog ${blogObject.title} by ${blogObject.author} added`,
          messageState: 'success',
        })
      )
    } catch (exception) {
      // Error Notification
      dispatch(
        setMessage({
          message: 'Error adding blog',
          messageState: 'error',
        })
      )
    }
  }

  const handleUpdateBlog = async (blogToUpdate, blogid) => {
    try {
      dispatch(updateBlog(blogToUpdate, user.token, blogid))

      // Success Notification
      dispatch(
        setMessage({
          message: `You liked ${blogToUpdate.title} by ${blogToUpdate.author}`,
          messageState: 'success',
        })
      )
    } catch (exception) {
      console.log(exception)
      // Error Notification
      dispatch(
        setMessage({
          message: 'Error updating blog',
          messageState: 'error',
        })
      )
    }
  }

  const handleDeleteBlog = async (blogid) => {
    try {
      dispatch(deleteBlog(blogid, user.token))
      // Sucess Notification
      dispatch(
        setMessage({
          message: 'Deleted successfully',
          messageState: 'success',
        })
      )
    } catch (exception) {
      console.error(exception)

      // Error Notification
      dispatch(
        setMessage({
          message: 'Error deleting blog',
          messageState: 'error',
        })
      )
    }
  }

  const handleAddComment = async (blogid, comment) => {
    try {
      dispatch(addComment(blogid, comment, user.token))

      // Sucess Notification
      dispatch(
        setMessage({
          message: 'Comment added successfully',
          messageState: 'success',
        })
      )
    } catch (exception) {
      // Error Notification
      dispatch(
        setMessage({
          message: 'Error deleting blog',
          messageState: 'error',
        })
      )
    }
  }

  if (user === null) {
    return (
      <Container fixed sx={{ marginTop: 5 }}>
        <Notification />
        {/* <LoginForm
          handleLogin={handleLogin}
          handlePassword={handlePassword}
          handleUsername={handleUsername}
          username={username}
          password={password}
        /> */}
        <Login
          handleLogin={handleLogin}
          handlePassword={handlePassword}
          handleUsername={handleUsername}
        />
      </Container>
    )
  }

  return (
    <Router>
      <Navbar loggedInUser={user.name} logout={handleLogout} />
      <Container sx={{ marginTop: 5 }} fixed>
        <Notification />
        <Grid container justifyContent="center">
          <h1 style={{ margin: 'auto', marginBottom: '2rem' }}>Blogs App</h1>
        </Grid>
        <div>
          <Routes>
            <Route path="/users/:id" element={<User />} />
            <Route path="/users" element={<Users />} />
            <Route
              path="/blogs/:id"
              element={
                <Blog
                  updateBlog={handleUpdateBlog}
                  deleteBlog={handleDeleteBlog}
                  addComment={handleAddComment}
                />
              }
            />
            <Route
              path="/"
              element={
                <Home
                  handleBlogCreation={handleBlogCreation}
                  blogFormRef={blogFormRef}
                />
              }
            />
            <Route
              path="/createblog"
              element={<CreateBlog createBlog={handleBlogCreation} />}
            />
          </Routes>
        </div>
      </Container>
    </Router>
  )
}

export default App
