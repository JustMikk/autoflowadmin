import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface User {
  id: string
  name: string
  email: string
  phone: string
  type: "buyer" | "seller" | "both"
  status: "active" | "suspended" | "pending"
  lastLogin: string
  createdAt: string
}

interface UsersState {
  users: User[]
  loading: boolean
  searchTerm: string
  statusFilter: string
  typeFilter: string
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1-555-0123",
    type: "buyer",
    status: "active",
    lastLogin: "2024-01-15T10:30:00Z",
    createdAt: "2023-12-01T09:00:00Z",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1-555-0124",
    type: "seller",
    status: "active",
    lastLogin: "2024-01-14T15:45:00Z",
    createdAt: "2023-11-15T14:20:00Z",
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike.wilson@email.com",
    phone: "+1-555-0125",
    type: "both",
    status: "suspended",
    lastLogin: "2024-01-10T08:15:00Z",
    createdAt: "2023-10-20T11:30:00Z",
  },
]

const initialState: UsersState = {
  users: mockUsers,
  loading: false,
  searchTerm: "",
  statusFilter: "all",
  typeFilter: "all",
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload
    },
    setTypeFilter: (state, action: PayloadAction<string>) => {
      state.typeFilter = action.payload
    },
    updateUserStatus: (state, action: PayloadAction<{ id: string; status: User["status"] }>) => {
      const user = state.users.find((u) => u.id === action.payload.id)
      if (user) {
        user.status = action.payload.status
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((u) => u.id !== action.payload)
    },
  },
})

export const { setSearchTerm, setStatusFilter, setTypeFilter, updateUserStatus, deleteUser } = usersSlice.actions
export default usersSlice.reducer
