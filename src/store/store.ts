import { configureStore } from "@reduxjs/toolkit";
import { authSlices } from "./auth";
import { teacherSlices } from "./teacher";
export const store = configureStore({
  reducer: {
    auth: authSlices.reducer,
    teacher: teacherSlices.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch