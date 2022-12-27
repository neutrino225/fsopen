/** @format */

import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
// import { Grid } from '@mui/material'

export default function ButtonAppBar({ loggedInUser, logout }) {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ margin: 0 }}>
          <Button href="/" variant="h6" sx={{ width: 20, margin: 2 }}>
            Blogs
          </Button>
          <Button href="/users" variant="h6" sx={{ width: 20, margin: 2 }}>
            Users
          </Button>
          <Typography
            variant="h6"
            component="div"
            sx={{ margin: 'auto', justifyContent: 'center' }}
          >
            {loggedInUser}
          </Typography>
          <Button
            color="inherit"
            sx={{ marginLeft: 'auto', width: 40, margin: 2 }}
            onClick={logout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

// /** @format */

// import * as React from 'react'
// import AppBar from '@mui/material/AppBar'
// import Box from '@mui/material/Box'
// import Toolbar from '@mui/material/Toolbar'
// import Button from '@mui/material/Button'
// import IconButton from '@mui/material/IconButton'
// import Typography from '@mui/material/Typography'

// export default function ButtonAppBar({ loggedInUser, logout }) {
//   return (
//     <Box
//       display="flex"
//       sx={{
//         flexGrow: 1,
//       }}
//     >
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           ></IconButton>
//           <Button href="/" variant="h6" sx={{ width: 20, margin: 2 }}>
//             Blogs
//           </Button>
//           <Button href="/users" variant="h6" sx={{ width: 20, margin: 2 }}>
//             Users
//           </Button>
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{ margin: 'auto', justifyContent: 'center' }}
//           >
//             {loggedInUser}
//           </Typography>
//           <Button
//             color="inherit"
//             sx={{ marginLeft: 'auto', width: 'auto' }}
//             onClick={logout}
//           >
//             Logout
//           </Button>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   )
// }
