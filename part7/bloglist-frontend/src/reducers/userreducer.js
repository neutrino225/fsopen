import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    changeUser(state, action) {
      return action.payload
    },
  },
})

export const { changeUser } = userSlice.actions

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch(changeUser(user))
  }
}

export default userSlice.reducer
