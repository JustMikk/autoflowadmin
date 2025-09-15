import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface DealerUser {
  id: string
  email: string
  companyName: string
  firstName: string
  lastName: string
  phone: string
  status: "pending" | "active" | "suspended"
  plan: "basic" | "premium" | "enterprise"
  onboardingCompleted: boolean
  profileCompleted: boolean
}

interface DealerAuthState {
  user: DealerUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  onboardingStep: number
}

const initialState: DealerAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  onboardingStep: 1,
}

const dealerAuthSlice = createSlice({
  name: "dealerAuth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<DealerUser>) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = action.payload
      state.error = null
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.isAuthenticated = false
      state.user = null
      state.error = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.error = null
      state.onboardingStep = 1
    },
    updateOnboardingStep: (state, action: PayloadAction<number>) => {
      state.onboardingStep = action.payload
    },
    updateProfile: (state, action: PayloadAction<Partial<DealerUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, updateOnboardingStep, updateProfile, clearError } =
  dealerAuthSlice.actions

export default dealerAuthSlice.reducer
