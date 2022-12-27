/** @format */

import { useState } from 'react'
import { TextField, IconButton } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

const AddComment = ({ addComment, hide }) => {
  const [comment, setComment] = useState('')

  const handleComment = (event) => {
    event.preventDefault()
    setComment(event.target.value)
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    addComment(comment)

    setComment('')
  }

  return (
    <form onSubmit={onFormSubmit}>
      {/* Comment: <input type="text" value={comment} onChange={handleComment} /> */}
      <TextField
        sx={{ marginTop: 4 }}
        type="text"
        value={comment}
        onChange={handleComment}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={hide}>
                <CloseOutlinedIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  )
}

export default AddComment
