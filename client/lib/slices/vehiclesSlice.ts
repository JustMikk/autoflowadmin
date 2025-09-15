import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Vehicle {
  id: string
  vin: string
  make: string
  model: string
  year: number
  price: number
  status: "active" | "pending" | "sold" | "rejected"
  dealerId: string
  dealerName: string
  mileage: number
  condition: "new" | "used" | "certified"
  createdAt: string
}

interface VehiclesState {
  vehicles: Vehicle[]
  loading: boolean
  searchTerm: string
  statusFilter: string
  makeFilter: string
}

const mockVehicles: Vehicle[] = [
  {
    id: "1",
    vin: "1HGBH41JXMN109186",
    make: "Toyota",
    model: "Camry",
    year: 2023,
    price: 28500,
    status: "active",
    dealerId: "1",
    dealerName: "Premium Auto Sales",
    mileage: 15000,
    condition: "used",
    createdAt: "2024-01-10T09:00:00Z",
  },
  {
    id: "2",
    vin: "2HGBH41JXMN109187",
    make: "Honda",
    model: "Civic",
    year: 2024,
    price: 24900,
    status: "pending",
    dealerId: "2",
    dealerName: "City Motors",
    mileage: 0,
    condition: "new",
    createdAt: "2024-01-12T11:30:00Z",
  },
]

const initialState: VehiclesState = {
  vehicles: mockVehicles,
  loading: false,
  searchTerm: "",
  statusFilter: "all",
  makeFilter: "all",
}

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload
    },
    setMakeFilter: (state, action: PayloadAction<string>) => {
      state.makeFilter = action.payload
    },
    updateVehicleStatus: (state, action: PayloadAction<{ id: string; status: Vehicle["status"] }>) => {
      const vehicle = state.vehicles.find((v) => v.id === action.payload.id)
      if (vehicle) {
        vehicle.status = action.payload.status
      }
    },
  },
})

export const { setSearchTerm, setStatusFilter, setMakeFilter, updateVehicleStatus } = vehiclesSlice.actions
export default vehiclesSlice.reducer
