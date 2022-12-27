/** @format */

import { useSelector } from 'react-redux'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { TableHead } from '@mui/material'
import Paper from '@mui/material/Paper'

import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#161616' }}>
            <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>
              Saved Blogs
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell component="th" scope="row">
                <Link to={`/blogs/${blog.id}`} underline="none" color="primary">
                  {blog.title} {blog.author}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BlogList
