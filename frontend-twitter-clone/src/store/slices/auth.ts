import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  accessToken: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    setAccessToken(state, action: PayloadAction<any>) {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout, setAccessToken } = authSlice.actions;
export const getAuthDataFromStore = (state: RootState): AuthState => state.authSlice;
export default authSlice.reducer;
