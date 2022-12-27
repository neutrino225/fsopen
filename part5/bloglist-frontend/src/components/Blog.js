/** @format */

import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const handleVisible = () => {
    setVisible(!visible)
  }

  const handleUpdateBlog = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    updateBlog(blogObject, blog.id)
  }

  const handleDeleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
      // handleVisible() // to hide the blog after deletion
    }
  }

  const buttonStyle = {
    marginBottom: '10px',
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (visible === true) {
    return (
      <div style={blogStyle}>
        <div className="finalBlog">
          <p>
						Title: {blog.title} <button onClick={handleVisible}>hide</button>
          </p>
          <p>Author: {blog.author}</p>
          <p>Url: {blog.url}</p>
          <p>
						Likes: {blog.likes}{' '}
            <button id="like-blog-button" onClick={handleUpdateBlog}>
							like
            </button>
          </p>
          <div>
            <p>{/* Created by: <strong>{blog.user.name}</strong> */}</p>
          </div>
          <button className="remove" onClick={handleDeleteBlog}>
						remove
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div className="initialBlog">
        {blog.title} {blog.author}{' '}
        <button onClick={handleVisible} style={buttonStyle} id="view-blog">
					view
        </button>
      </div>
    </div>
  )
}

export default Blog
