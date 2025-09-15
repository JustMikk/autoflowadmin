import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Lead {
  id: string
  buyerName: string
  buyerEmail: string
  vehicleId: string
  vehicleName: string
  dealerId: string
  dealerName: string
  status: "new" | "contacted" | "qualified" | "converted" | "lost"
  priority: "low" | "medium" | "high"
  createdAt: string
  lastContact: string
}

interface LeadsState {
  leads: Lead[]
  loading: boolean
  statusFilter: string
  priorityFilter: string
}

const mockLeads: Lead[] = [
  {
    id: "1",
    buyerName: "John Smith",
    buyerEmail: "john.smith@email.com",
    vehicleId: "1",
    vehicleName: "2023 Toyota Camry",
    dealerId: "1",
    dealerName: "Premium Auto Sales",
    status: "new",
    priority: "high",
    createdAt: "2024-01-15T14:30:00Z",
    lastContact: "2024-01-15T14:30:00Z",
  },
]

const initialState: LeadsState = {
  leads: mockLeads,
  loading: false,
  statusFilter: "all",
  priorityFilter: "all",
}

const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload
    },
    setPriorityFilter: (state, action: PayloadAction<string>) => {
      state.priorityFilter = action.payload
    },
    updateLeadStatus: (state, action: PayloadAction<{ id: string; status: Lead["status"] }>) => {
      const lead = state.leads.find((l) => l.id === action.payload.id)
      if (lead) {
        lead.status = action.payload.status
      }
    },
  },
})

export const { setStatusFilter, setPriorityFilter, updateLeadStatus } = leadsSlice.actions
export default leadsSlice.reducer
