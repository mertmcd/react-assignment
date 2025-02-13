import { configureStore } from "@reduxjs/toolkit";
import { reviewSlice } from "../features/reviewSlicer";

export const store = configureStore({
  reducer: {
    review: reviewSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
