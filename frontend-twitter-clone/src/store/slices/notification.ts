import { IpostProps } from '../../interface/post';
import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type postsDataSliceProps = {
  notificationData: IpostProps[];
};

const initialState: postsDataSliceProps = {
  notificationData: [],
};

export const notificationSlice = createSlice({
  name: 'postsByUser',
  initialState,
  reducers: {
    setNotificationData: (state, action: PayloadAction<IpostProps[]>) => {
      state.notificationData = action.payload;
    },
  },
});

export const { setNotificationData } = notificationSlice.actions;

export const getUserNotificationDataFromStore = (state: RootState): IpostProps[] =>
  state.notificationSlice.notificationData;

export default notificationSlice.reducer;
