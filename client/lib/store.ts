import { configureStore } from "@reduxjs/toolkit"
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import usersSlice from "./slices/usersSlice"
import dealersSlice from "./slices/dealersSlice"
import vehiclesSlice from "./slices/vehiclesSlice"
import leadsSlice from "./slices/leadsSlice"
import reviewsSlice from "./slices/reviewsSlice"
import subscriptionsSlice from "./slices/subscriptionsSlice"
import analyticsSlice from "./slices/analyticsSlice"
import dealerAuthSlice from "./slices/dealerAuthSlice"
import dealerVehiclesSlice from "./slices/dealerVehiclesSlice"

export const store = configureStore({
  reducer: {
    users: usersSlice,
    dealers: dealersSlice,
    vehicles: vehiclesSlice,
    leads: leadsSlice,
    reviews: reviewsSlice,
    subscriptions: subscriptionsSlice,
    analytics: analyticsSlice,
    dealerAuth: dealerAuthSlice,
    dealerVehicles: dealerVehiclesSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
