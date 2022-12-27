/** @format */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setMessage } from '../reducers/notificationreducer'

import React from 'react'
import { Grid, Paper, TextField, Button } from '@mui/material'

const CreateBlog = ({ createBlog }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

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

    if (title === '' || author === '' || url === '') {
      dispatch(
        setMessage({
          message: 'One or more fields were left empty',
          messageState: 'error',
        })
      )
      return
    }

    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    createBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
    navigate('/')
  }

  // return (
  //   <div>
  //     <form onSubmit={addBlog}>
  //       <div>
  //         title:{' '}
  //         <input value={title} onChange={handleTitle} type="text" id="title" />
  //       </div>
  //       <div>
  //         author:{' '}
  //         <input
  //           value={author}
  //           onChange={handleAuthor}
  //           type="text"
  //           id="author"
  //         />
  //       </div>
  //       <div>
  //         url: <input value={url} onChange={handleUrl} type="text" id="url" />
  //       </div>
  //       <button type="submit" className="createBlog">
  //         create
  //       </button>
  //     </form>
  //   <CreateBlog2
  //     handleAuthor={handleAuthor}
  //     handleTitle={handleTitle}
  //     handleUrl={handleUrl}
  //     addBlog={addBlog}
  //   />
  //   </div>
  // )

  const paperStyle = {
    padding: 20,
    height: 'auto',
    width: 280,
    margin: '20px auto',
  }
  const btnstyle = { margin: '20px 0' }

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <h2>Create Blog</h2>
        </Grid>
        <div style={{ height: 18 }}></div>
        <TextField
          value={title}
          onChange={handleTitle}
          label="Title"
          placeholder="Title"
          type="text"
          margin="normal"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          value={author}
          onChange={handleAuthor}
          label="Author"
          margin="normal"
          placeholder="Author"
          type="text"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          value={url}
          onChange={handleUrl}
          label="url"
          margin="normal"
          placeholder="url"
          type="text"
          variant="outlined"
          fullWidth
          required
        />
        <Button
          onClick={addBlog}
          type="submit"
          color="secondary"
          variant="contained"
          style={btnstyle}
          fullWidth
        >
          Create
        </Button>
      </Paper>
    </Grid>
  )
}

export default CreateBlog
