import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Review } from "../types/product";

const storage = localStorage.getItem("reviews");
interface ReviewState {
  reviews: Review[];
}

const initialState: ReviewState = {
  reviews: storage ? JSON.parse(storage) : [],
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    addReview(state, action: PayloadAction<Review>) {
      state.reviews.push(action.payload);
      localStorage.setItem("reviews", JSON.stringify(state.reviews));
    },
  },
});

export const selectReviewsByProductId = createSelector(
  (state: { review: ReviewState }) => state.review.reviews,
  (_: unknown, productId: number) => productId,
  (reviews, productId) => reviews.filter((review) => review.id === productId)
);

export const { addReview } = reviewSlice.actions;
