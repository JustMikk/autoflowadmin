import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  features: string[]
  maxVehicles: number
  isActive: boolean
}

export interface Transaction {
  id: string
  dealerId: string
  dealerName: string
  amount: number
  status: "pending" | "completed" | "refunded"
  type: "subscription" | "listing_fee" | "premium_feature"
  createdAt: string
}

interface SubscriptionsState {
  plans: SubscriptionPlan[]
  transactions: Transaction[]
  loading: boolean
}

const mockPlans: SubscriptionPlan[] = [
  {
    id: "1",
    name: "Basic",
    price: 99,
    features: ["Up to 10 vehicles", "Basic analytics", "Email support"],
    maxVehicles: 10,
    isActive: true,
  },
  {
    id: "2",
    name: "Premium",
    price: 199,
    features: ["Up to 50 vehicles", "Advanced analytics", "Priority support", "Featured listings"],
    maxVehicles: 50,
    isActive: true,
  },
]

const mockTransactions: Transaction[] = [
  {
    id: "1",
    dealerId: "1",
    dealerName: "Premium Auto Sales",
    amount: 199,
    status: "completed",
    type: "subscription",
    createdAt: "2024-01-01T00:00:00Z",
  },
]

const initialState: SubscriptionsState = {
  plans: mockPlans,
  transactions: mockTransactions,
  loading: false,
}

const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    updatePlan: (state, action: PayloadAction<SubscriptionPlan>) => {
      const index = state.plans.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) {
        state.plans[index] = action.payload
      }
    },
    addPlan: (state, action: PayloadAction<SubscriptionPlan>) => {
      state.plans.push(action.payload)
    },
  },
})

export const { updatePlan, addPlan } = subscriptionsSlice.actions
export default subscriptionsSlice.reducer
