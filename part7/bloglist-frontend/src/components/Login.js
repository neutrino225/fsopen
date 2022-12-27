/** @format */

import React from 'react'

import { Grid, Paper, TextField, Button, Avatar } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Checkbox from '@mui/material/Checkbox'
const Login = ({ handleLogin, handleUsername, handlePassword }) => {
  const paperStyle = {
    padding: 20,
    height: '50vh',
    width: 280,
    margin: '20px auto',
  }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnstyle = { margin: '20px 0' }

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <div style={{ height: 18 }}></div>
        <TextField
          onChange={handleUsername}
          placeholder="Enter Username"
          type="text"
          margin="normal"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          onChange={handlePassword}
          margin="normal"
          placeholder="Enter password"
          type="password"
          variant="outlined"
          fullWidth
          required
        />
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
          checked
        />
        <Button
          onClick={handleLogin}
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
        >
          Sign in
        </Button>
      </Paper>
    </Grid>
  )
}

export default Login
