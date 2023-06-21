import { userType } from '../../schema/user.schema';
import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type userDataSliceProps = {
  userData: userType[];
};

const initialState: userDataSliceProps = {
  userData: [],
};

export const userDataSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<userType[]>) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = userDataSlice.actions;

export const getUsersDataFromStore = (state: RootState): userType[] =>
  state.userDataSlice.userData;

export default userDataSlice.reducer;
