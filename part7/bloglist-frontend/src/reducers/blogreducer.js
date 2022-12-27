/** @format */

import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    changeBlog(state, action) {
      const blogToChange = action.payload
      const id = blogToChange.id

      const updatedState = state.map((b) => (b.id !== id ? b : blogToChange))
      const sortedBlogList = updatedState.sort((a, b) => b.likes - a.likes)
      return sortedBlogList
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { setBlogs, appendBlog, changeBlog, removeBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog, userToken) => {
  return async (dispatch) => {
    const newBlog = await blogService.addBlog(blog, userToken)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (id, userToken) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id, userToken)
    dispatch(removeBlog(id))
  }
}

export const updateBlog = (blog, token, blogId) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.updateBlog(blog, token, blogId)

    dispatch(changeBlog(updatedBlog))
  }
}

export const addComment = (blogid, comment, token) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(blogid, comment, token)

    dispatch(changeBlog(updatedBlog))
  }
}

export default blogSlice.reducer
