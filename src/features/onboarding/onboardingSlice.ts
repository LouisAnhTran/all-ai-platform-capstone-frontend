import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../../../src/app/store" // adjust the import path as needed

interface OnBoardingState {
  isOnboarded: boolean
}

const initialState: OnBoardingState = {
  isOnboarded: true
}

export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    updateOnboadingState: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isOnboarded = action.payload
    }
  },
})

export const { updateOnboadingState } = onboardingSlice.actions

export const getOnboardingState = (state: RootState): boolean =>
  state.onboarding.isOnboarded

export default onboardingSlice.reducer
