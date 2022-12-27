// import Togglable from './Togglable'
import BlogList from './BlogList'
// import CreateBlog from './CreateBlog'

import { Button } from '@mui/material'
// import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <Button href="/createblog">CREATE NEW</Button>
      </div>
      <BlogList />
    </div>
  )
}

export default Home
