import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    messageState: null,
  },
  reducers: {
    setNotification(state, action) {
      const message = action.payload.message
      const messageState = action.payload.messageState

      return { message, messageState }
    },
  },
})

let timeoutId

export const { setNotification } = notificationSlice.actions

export const setMessage = (message, messageState) => {
  return (dispatch) => {
    clearTimeout(timeoutId)
    dispatch(setNotification(message, messageState))

    timeoutId = setTimeout(() => {
      dispatch(setNotification({ message: '', messageState: null }))
    }, 5000)
  }
}

export default notificationSlice.reducer
