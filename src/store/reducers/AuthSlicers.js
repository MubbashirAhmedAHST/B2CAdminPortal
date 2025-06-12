// store/slices/yourSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  expiry:null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.accessToken = action.payload; // Save token
    },
    saveExpiry: (state, action) => {
      state.expiry = action.payload; // Save token
    },
    saveUser: (state, action) => {
      state.user = action.payload;
    },
  
    logout: (state) => {
      state.user = null;
      state.accessToken = null; // Clear token on logout
      state.expiry = null; // Clear token on logout
    },
  },
});

export const { saveUser, logout ,saveToken ,saveExpiry } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
