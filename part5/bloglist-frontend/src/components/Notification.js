/** @format */

const Notification = ({ message, state }) => {
  if (message === null) {
    return null
  } else if (state === 'success') {
    return <div className="success">{message}</div>
  } else if (state === 'error') {
    return <div className="error">{message}</div>
  }
}

export default Notification
