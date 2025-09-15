import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Dealer {
  id: string
  businessName: string
  contactName: string
  email: string
  phone: string
  subscriptionPlan: "basic" | "premium" | "enterprise"
  status: "active" | "suspended" | "pending"
  totalVehicles: number
  rating: number
  locations: string[]
  createdAt: string
}

interface DealersState {
  dealers: Dealer[]
  loading: boolean
  searchTerm: string
  statusFilter: string
  planFilter: string
}

const mockDealers: Dealer[] = [
  {
    id: "1",
    businessName: "Premium Auto Sales",
    contactName: "Robert Davis",
    email: "robert@premiumauto.com",
    phone: "+1-555-0200",
    subscriptionPlan: "premium",
    status: "active",
    totalVehicles: 45,
    rating: 4.8,
    locations: ["New York", "New Jersey"],
    createdAt: "2023-08-15T10:00:00Z",
  },
  {
    id: "2",
    businessName: "City Motors",
    contactName: "Lisa Chen",
    email: "lisa@citymotors.com",
    phone: "+1-555-0201",
    subscriptionPlan: "basic",
    status: "active",
    totalVehicles: 23,
    rating: 4.2,
    locations: ["Los Angeles"],
    createdAt: "2023-09-20T14:30:00Z",
  },
]

const initialState: DealersState = {
  dealers: mockDealers,
  loading: false,
  searchTerm: "",
  statusFilter: "all",
  planFilter: "all",
}

const dealersSlice = createSlice({
  name: "dealers",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload
    },
    setPlanFilter: (state, action: PayloadAction<string>) => {
      state.planFilter = action.payload
    },
    updateDealerStatus: (state, action: PayloadAction<{ id: string; status: Dealer["status"] }>) => {
      const dealer = state.dealers.find((d) => d.id === action.payload.id)
      if (dealer) {
        dealer.status = action.payload.status
      }
    },
  },
})

export const { setSearchTerm, setStatusFilter, setPlanFilter, updateDealerStatus } = dealersSlice.actions
export default dealersSlice.reducer
