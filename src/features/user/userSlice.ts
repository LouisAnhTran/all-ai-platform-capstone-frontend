import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../../../src/app/store" // adjust the import path as needed

interface UserState {
  openSignup: boolean
  openLogin: boolean
}

const initialState: UserState = {
  openSignup: false,
  openLogin: false,
}

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changeModalSignUp: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.openSignup = !state.openSignup
    },
    changeModalSignIn: state => {
      state.openLogin = !state.openLogin
    },
  },
})

export const { changeModalSignUp, changeModalSignIn } = userSlice.actions

export const getOpenSignUp = (state: RootState): boolean =>
  state.users.openSignup

export const getOpenSignIn = (state: RootState): boolean =>
  state.users.openLogin

export default userSlice.reducer
