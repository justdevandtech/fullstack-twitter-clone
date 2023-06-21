import { configureStore } from '@reduxjs/toolkit';
import userDataSlice from './slices/user';
import postsDataSlice from './slices/post';
import authSlice from './slices/auth';
import userPostsDataSlice  from './slices/postByUserId';
import notificationSlice from './slices/notification';

export const store = configureStore({
  reducer: {
    userDataSlice,
    postsDataSlice,
    authSlice,
    userPostsDataSlice,
    notificationSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
