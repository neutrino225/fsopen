/** @format */
import { useSelector } from 'react-redux'

import Alert from '@mui/material/Alert'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.message === null) {
    return null
  } else if (notification.messageState === 'success') {
    // return <div className="success">{notification.message}</div>;
    return <Alert severity="success">{notification.message}</Alert>
  } else if (notification.messageState === 'error') {
    // return <div className="error">{notification.message}</div>;
    return <Alert severity="error">{notification.message}</Alert>
  }
}

export default Notification
