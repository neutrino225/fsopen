/** @format */

import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './index.css'

import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // Notifications
  const [notification, setNotification] = useState(null)
  const [notificationState, setNotificationState] = useState(null)

  // Ref for Togglable
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
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

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')

      // Success Notification

      setNotification(`Welcome ${user.name}`)
      setNotificationState('success')

      setTimeout(() => {
        setNotification(null)
        setNotificationState(null)
      }, 5000)
    } catch (exception) {
      setUser(null)

      setUsername('')
      setPassword('')

      // Error Notification
      setNotification('Wrong username or password')
      setNotificationState('error')

      setTimeout(() => {
        setNotification(null)
        setNotificationState(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
    // Success Notification

    setNotification('Logged out')
    setNotificationState('success')

    setTimeout(() => {
      setNotification(null)
      setNotificationState(null)
    }, 5000)
  }

  const handleBlogCreation = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.addBlog(blogObject, user.token)
      setBlogs(blogs.concat(returnedBlog))

      // Success Notification

      setNotification(
        `A new blog ${blogObject.title} by ${blogObject.author} added`,
      )
      setNotificationState('success')

      setTimeout(() => {
        setNotification(null)
        setNotificationState(null)
      }, 5000)
    } catch (exception) {
      // Error Notification
      console.error(exception)

      setNotification('Error adding blog')
      setNotificationState('error')

      setTimeout(() => {
        setNotification(null)
        setNotificationState(null)
      }, 5000)
    }
  }

  const handleUpdateBlog = async (blogToUpdate, blogid) => {
    try {
      const updatedBlog = await blogService.updateBlog(
        blogToUpdate,
        user.token,
        blogid,
      )

      const updatedList = blogs.map((b) => (b.id !== blogid ? b : updatedBlog))

      const sortedBlogList = updatedList.sort((a, b) => b.likes - a.likes)

      setBlogs(sortedBlogList)

      // Success Notification

      setNotification(
        `You liked ${blogToUpdate.title} by ${blogToUpdate.author}`,
      )
      setNotificationState('success')

      setTimeout(() => {
        setNotification(null)
        setNotificationState(null)
      }, 5000)
    } catch (exception) {
      console.error(exception)
      // Error Notification
      setNotification('Error updating blog')
      setNotificationState('error')

      setTimeout(() => {
        setNotification(null)
        setNotificationState(null)
      }, 5000)
    }
  }

  const handleDeleteBlog = async (blogid) => {
    try {
      await blogService.deleteBlog(blogid, user.token)

      setBlogs(blogs.filter((blog) => blog.id !== blogid))

      // Sucess Notification
      setNotification('Deleted successfully')
      setNotificationState('success')

      setTimeout(() => {
        setNotification(null)
        setNotificationState(null)
      }, 5000)
    } catch (exception) {
      console.error(exception)

      // Error Notification

      setNotification('Error deleting blog')
      setNotificationState('error')

      setTimeout(() => {
        setNotification(null)
        setNotificationState(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={notification} state={notificationState} />
        <LoginForm
          handleLogin={handleLogin}
          handlePassword={handlePassword}
          handleUsername={handleUsername}
          username={username}
          password={password}
        />
      </div>
    )
  }

  console.log('notification -> ', notification)
  console.log('notificationState -> ', notificationState)

  return (
    <div>
      <Notification message={notification} state={notificationState} />
      <h1>Blogs</h1>
      <div>
        {/* <Togglable buttonLabel="login">
					<LoginForm
						handleLogin={handleLogin}
						handlePassword={handlePassword}
						handleUsername={handleUsername}
						username={username}
						password={password}
					/>
				</Togglable> */}
      </div>
      <div>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
        <div>
          <h2>Create blog</h2>
          <div>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
              <CreateBlog createBlog={handleBlogCreation} />
            </Togglable>
          </div>
        </div>
      </div>
      <div>
        <h2>Saved blogs</h2>
      </div>
      <div className="blog">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={handleUpdateBlog}
            deleteBlog={handleDeleteBlog}
          />
        ))}
      </div>
    </div>
  )
}

export default App
