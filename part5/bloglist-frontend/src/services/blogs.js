/** @format */

import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs' ///api

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const addBlog = async (blog, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const updateBlog = async (blog, token, id) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  const response = await axios.put(`${baseUrl}/${id}`, blog, config)
  return response.data
}

const deleteBlog = async (blogid, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }

  const response = await axios.delete(`${baseUrl}/${blogid}`, config)
  return response.data
}
//eslint-disable-next-line
export default { getAll, addBlog, updateBlog, deleteBlog };
