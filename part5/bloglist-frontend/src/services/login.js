/** @format */

import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'

const login = async (credentials) => {
  console.log(credentials)
  try {
    const response = await axios.post(baseUrl, credentials)
    return response.data
  } catch (error) {
    return undefined
  }
}

//eslint-disable-next-line
export default { login };
