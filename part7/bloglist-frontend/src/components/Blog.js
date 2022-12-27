/** @format */
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AddComment from './AddComment'
import Togglable from './Togglable'
import { useRef } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { IconButton } from '@mui/material'
import Button from '@mui/material/Button'

const Comments = ({ comments }) => {
  if (comments.length === 0)
    return <p style={{ paddingLeft: 10 }}>no comments on this blog yet</p>

  return (
    <div style={{ paddingLeft: 10 }}>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  )
}

const Blog = ({ updateBlog, deleteBlog, addComment }) => {
  const blogs = useSelector((state) => state.blogs)
  const navigate = useNavigate()
  const commentRef = useRef()

  const id = useParams().id

  const blog = blogs.find((b) => b.id === id)
  const blogUser = blog.user.name
  const comments = blog.comments

  const handleUpdateBlog = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      comments: blog.comments,
    }
    updateBlog(blogObject, blog.id)
  }

  const handleDeleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
      navigate('/')
      // handleVisible() // to hide the blog after deletion
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const hide = () => {
    commentRef.current.toggleVisibility()
  }

  const handleNewComment = async (comment) => {
    commentRef.current.toggleVisibility()
    addComment(blog.id, comment)
  }

  return (
    <div style={blogStyle}>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <a href={blog.url} target="_blank" rel="noreferrer">
        {blog.url}
      </a>
      <p>
        {blog.likes} likes
        <IconButton onClick={handleUpdateBlog} color="like">
          <FavoriteIcon sx={{ color: 'red' }} />
        </IconButton>
      </p>
      <p style={{ marginTop: '1rem' }}>added by {blogUser}</p>
      <div>
        <h3>
          <u>Comments</u>
        </h3>
        <Comments comments={comments} />
      </div>
      <div>
        <Togglable buttonLabel="add a comment" ref={commentRef}>
          <AddComment addComment={handleNewComment} hide={hide} />
        </Togglable>
      </div>
      <Button
        variant="contained"
        color="error"
        onClick={handleDeleteBlog}
        sx={{ marginTop: '2rem', marginBottom: 2, marginLeft: 'auto' }}
      >
        Remove
      </Button>
    </div>
  )
}

export default Blog
