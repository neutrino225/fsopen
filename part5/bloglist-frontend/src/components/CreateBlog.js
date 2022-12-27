/** @format */

import { useState } from 'react'

const CreateBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitle = (event) => {
    event.preventDefault()
    setTitle(event.target.value)
  }

  const handleAuthor = (event) => {
    event.preventDefault()
    setAuthor(event.target.value)
  }

  const handleUrl = (event) => {
    event.preventDefault()
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    createBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
					title:{' '}
          <input value={title} onChange={handleTitle} type="text" id="title" />
        </div>
        <div>
					author:{' '}
          <input
            value={author}
            onChange={handleAuthor}
            type="text"
            id="author"
          />
        </div>
        <div>
					url: <input value={url} onChange={handleUrl} type="text" id="url" />
        </div>
        <button type="submit" className="createBlog">
					create
        </button>
      </form>
    </div>
  )
}

export default CreateBlog
