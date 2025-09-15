import { createSlice } from "@reduxjs/toolkit"

interface AnalyticsState {
  kpis: {
    totalUsers: number
    totalDealers: number
    activeListings: number
    totalLeads: number
    totalTransactions: number
    totalAds: number
    avgDealSize: number
    monthlyGrowth: number
    activeSubscriptions: number
  }
  revenueData: Array<{ month: string; revenue: number }>
  leadConversionData: Array<{ stage: string; count: number }>
  vehiclesByMake: Array<{ make: string; count: number }>
  dealerPerformance: Array<{ name: string; sales: number; leads: number }>
  userGrowth: Array<{ month: string; users: number; dealers: number }>
  loading: boolean
}

const initialState: AnalyticsState = {
  kpis: {
    totalUsers: 1247,
    totalDealers: 89,
    activeListings: 567,
    totalLeads: 234,
    totalTransactions: 156,
    totalAds: 45,
    avgDealSize: 28500,
    monthlyGrowth: 15.2,
    activeSubscriptions: 78,
  },
  revenueData: [
    { month: "Jan", revenue: 12500 },
    { month: "Feb", revenue: 15200 },
    { month: "Mar", revenue: 18900 },
    { month: "Apr", revenue: 22100 },
    { month: "May", revenue: 19800 },
    { month: "Jun", revenue: 25400 },
  ],
  leadConversionData: [
    { stage: "New", count: 45 },
    { stage: "Contacted", count: 32 },
    { stage: "Qualified", count: 18 },
    { stage: "Converted", count: 12 },
  ],
  vehiclesByMake: [
    { make: "Toyota", count: 89 },
    { make: "Honda", count: 76 },
    { make: "Ford", count: 65 },
    { make: "BMW", count: 54 },
    { make: "Mercedes", count: 43 },
  ],
  dealerPerformance: [
    { name: "Premium Auto", sales: 23, leads: 45 },
    { name: "City Motors", sales: 18, leads: 32 },
    { name: "Elite Cars", sales: 15, leads: 28 },
    { name: "Auto World", sales: 12, leads: 25 },
  ],
  userGrowth: [
    { month: "Jan", users: 980, dealers: 65 },
    { month: "Feb", users: 1050, dealers: 68 },
    { month: "Mar", users: 1120, dealers: 72 },
    { month: "Apr", users: 1180, dealers: 76 },
    { month: "May", users: 1220, dealers: 82 },
    { month: "Jun", users: 1247, dealers: 89 },
  ],
  loading: false,
}

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
})

export default analyticsSlice.reducer
