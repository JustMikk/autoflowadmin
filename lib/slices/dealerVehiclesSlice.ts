import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  condition: "new" | "used" | "certified"
  bodyType: string
  fuelType: string
  transmission: string
  drivetrain: string
  exteriorColor: string
  interiorColor: string
  engineSize: string
  doors: number
  seats: number
  vin: string
  description: string
  features: string[]
  photos: string[]
  status: "draft" | "pending" | "live" | "sold" | "archived"
  createdAt: string
  updatedAt: string
  views: number
  leads: number
  location: string
  mpgCity?: number
  mpgHighway?: number
  acceleration?: string
  co2Emissions?: number
  taxPerYear?: number
  insuranceGroup?: string
  bootSpace?: number
  previouslyWrittenOff?: boolean
  manufacturerApproved?: boolean
}

interface DealerVehiclesState {
  vehicles: Vehicle[]
  isLoading: boolean
  error: string | null
  filters: {
    status: string
    make: string
    condition: string
    priceRange: [number, number]
  }
  searchQuery: string
}

const mockVehicles: Vehicle[] = [
  {
    id: "1",
    make: "BMW",
    model: "X5",
    year: 2023,
    price: 65000,
    mileage: 12500,
    condition: "used",
    bodyType: "SUV",
    fuelType: "Petrol",
    transmission: "Automatic",
    drivetrain: "AWD",
    exteriorColor: "Alpine White",
    interiorColor: "Black Leather",
    engineSize: "3.0L",
    doors: 5,
    seats: 7,
    vin: "WBAJA7C50PCG12345",
    description: "Pristine BMW X5 with premium package and low mileage.",
    features: ["Navigation", "Heated Seats", "Panoramic Sunroof", "Premium Audio"],
    photos: ["/bmw-x5-1.jpg", "/bmw-x5-2.jpg"],
    status: "live",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    views: 245,
    leads: 8,
    location: "New York, NY",
    mpgCity: 20,
    mpgHighway: 26,
    acceleration: "6.1s",
    co2Emissions: 185,
    taxPerYear: 580,
    insuranceGroup: "45E",
    bootSpace: 650,
    previouslyWrittenOff: false,
    manufacturerApproved: true,
  },
  {
    id: "2",
    make: "Tesla",
    model: "Model S",
    year: 2022,
    price: 89000,
    mileage: 8500,
    condition: "used",
    bodyType: "Sedan",
    fuelType: "Electric",
    transmission: "Automatic",
    drivetrain: "AWD",
    exteriorColor: "Pearl White",
    interiorColor: "White Interior",
    engineSize: "Electric",
    doors: 4,
    seats: 5,
    vin: "5YJ3E1EA8NF123456",
    description: "Tesla Model S with Autopilot and premium connectivity.",
    features: ["Autopilot", "Premium Connectivity", "Glass Roof", "Premium Audio"],
    photos: ["/tesla-model-s-1.jpg"],
    status: "pending",
    createdAt: "2024-01-14T14:30:00Z",
    updatedAt: "2024-01-14T14:30:00Z",
    views: 156,
    leads: 12,
    location: "New York, NY",
    acceleration: "3.1s",
    previouslyWrittenOff: false,
    manufacturerApproved: false,
  },
]

const initialState: DealerVehiclesState = {
  vehicles: mockVehicles,
  isLoading: false,
  error: null,
  filters: {
    status: "all",
    make: "all",
    condition: "all",
    priceRange: [0, 200000],
  },
  searchQuery: "",
}

const dealerVehiclesSlice = createSlice({
  name: "dealerVehicles",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    addVehicle: (state, action: PayloadAction<Omit<Vehicle, "id" | "createdAt" | "updatedAt" | "views" | "leads">>) => {
      const newVehicle: Vehicle = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        leads: 0,
      }
      state.vehicles.unshift(newVehicle)
    },
    updateVehicle: (state, action: PayloadAction<{ id: string; updates: Partial<Vehicle> }>) => {
      const { id, updates } = action.payload
      const vehicleIndex = state.vehicles.findIndex((v) => v.id === id)
      if (vehicleIndex !== -1) {
        state.vehicles[vehicleIndex] = {
          ...state.vehicles[vehicleIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
        }
      }
    },
    deleteVehicle: (state, action: PayloadAction<string>) => {
      state.vehicles = state.vehicles.filter((v) => v.id !== action.payload)
    },
    updateFilters: (state, action: PayloadAction<Partial<DealerVehiclesState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    updateVehicleStatus: (state, action: PayloadAction<{ id: string; status: Vehicle["status"] }>) => {
      const { id, status } = action.payload
      const vehicle = state.vehicles.find((v) => v.id === id)
      if (vehicle) {
        vehicle.status = status
        vehicle.updatedAt = new Date().toISOString()
      }
    },
  },
})

export const {
  setLoading,
  setError,
  addVehicle,
  updateVehicle,
  deleteVehicle,
  updateFilters,
  setSearchQuery,
  updateVehicleStatus,
} = dealerVehiclesSlice.actions

export default dealerVehiclesSlice.reducer
