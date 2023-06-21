import { IpostProps } from '../../interface/post';
import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type postsDataSliceProps = {
  postsData: IpostProps[];
};

const initialState: postsDataSliceProps = {
  postsData: [],
};

export const postsDataSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsData: (state, action: PayloadAction<IpostProps[]>) => {
      state.postsData = action.payload;
    },
  },
});

export const { setPostsData } = postsDataSlice.actions;

export const getPostsDataFromStore = (state: RootState): IpostProps[] =>
  state.postsDataSlice.postsData

export default postsDataSlice.reducer;
