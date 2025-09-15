import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Review {
  id: string
  reviewerName: string
  revieweeName: string
  revieweeType: "dealer" | "user"
  rating: number
  comment: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

interface ReviewsState {
  reviews: Review[]
  loading: boolean
  statusFilter: string
}

const mockReviews: Review[] = [
  {
    id: "1",
    reviewerName: "John Smith",
    revieweeName: "Premium Auto Sales",
    revieweeType: "dealer",
    rating: 5,
    comment: "Excellent service and great selection of vehicles.",
    status: "pending",
    createdAt: "2024-01-14T16:20:00Z",
  },
]

const initialState: ReviewsState = {
  reviews: mockReviews,
  loading: false,
  statusFilter: "all",
}

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload
    },
    updateReviewStatus: (state, action: PayloadAction<{ id: string; status: Review["status"] }>) => {
      const review = state.reviews.find((r) => r.id === action.payload.id)
      if (review) {
        review.status = action.payload.status
      }
    },
  },
})

export const { setStatusFilter, updateReviewStatus } = reviewsSlice.actions
export default reviewsSlice.reducer
