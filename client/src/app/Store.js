import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/UserSlice.js'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})



store.subscribe(() => {
  const { user } = store.getState().user;   // slice path
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }
});
