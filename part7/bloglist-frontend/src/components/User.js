import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Grid, Paper, List, ListItem } from '@mui/material'

const User = () => {
  const userId = useParams().id
  const usersInDb = useSelector((state) => state.usersInDb)
  const user = usersInDb.find((u) => u.id === userId)
  const userBlogs = user.blogs

  const paperStyle = {
    padding: 20,
    height: 'auto',
    width: 'auto',
    margin: '20px auto',
  }

  if (!user) {
    return null
  }

  return (
    <Grid>
      <Paper elevation={2} style={paperStyle}>
        <Grid align="center">
          <h2>{user.name}</h2>
        </Grid>
        <Grid>
          <h3>Added blogs</h3>
        </Grid>
        <Grid>
          <List>
            {userBlogs.map((blog) => (
              <ListItem key={blog.id}>{blog.title}</ListItem>
            ))}
          </List>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default User
