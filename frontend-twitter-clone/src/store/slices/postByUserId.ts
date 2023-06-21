import { IpostProps } from '../../interface/post';
import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type postsDataSliceProps = {
  userPostsData: IpostProps[];
};

const initialState: postsDataSliceProps = {
  userPostsData: [],
};

export const userPostsDataSlice = createSlice({
  name: 'postsByUser',
  initialState,
  reducers: {
    setUserPostsData: (state, action: PayloadAction<IpostProps[]>) => {
      state.userPostsData = action.payload;
    },
  },
});

export const { setUserPostsData } = userPostsDataSlice.actions;

export const getUserPostsDataFromStore = (state: RootState): IpostProps[] =>
  state.userPostsDataSlice.userPostsData;

export default userPostsDataSlice.reducer;
