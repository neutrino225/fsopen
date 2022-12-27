import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { TableHead } from '@mui/material'

const Users = () => {
  const users = useSelector((state) => state.usersInDb)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#161616' }}>
            <TableCell sx={{ color: 'white' }}>Name</TableCell>
            <TableCell sx={{ color: 'white' }}>Blogs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                <Link to={`/users/${user.id}`} underline="none" color="primary">
                  {user.name}
                </Link>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )

  // return (
  //   <div style={{ marginTop: '3rem', marginBottom: '2rem' }}>
  //     <h2>Users</h2>
  //     <table>
  //       <tbody>
  //         <tr>
  //           <th>{}</th>
  //           <th scope="col">
  //             <strong>blogs created</strong>
  //           </th>
  //         </tr>
  //         {users.map((user) => (
  //           <tr key={user.id}>
  //             <th>
  //               <Link to={`/users/${user.id}`}>{user.name}</Link>
  //             </th>
  //             <th>{user.blogs.length}</th>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>

  //   </div>
  // )
}

export default Users
