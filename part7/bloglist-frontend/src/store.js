/** @format */

import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogreducer'
import notificationreducer from './reducers/notificationreducer'
import userreducer from './reducers/userreducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationreducer,
    user: userreducer,
    usersInDb: usersReducer,
  },
})

export default store
