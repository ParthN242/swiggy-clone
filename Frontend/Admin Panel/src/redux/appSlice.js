import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    auth: {
      loading: false,
      admin: null,
      error: false,
    },
  },
  reducers: {
    authRequest: (state, action) => {
      state.auth = { loading: true, admin: null, error: false };
    },
    authSuccess: (state, action) => {
      state.auth = { loading: false, admin: action.payload, error: false };
    },
    authFailure: (state, action) => {
      state.auth = { loading: false, admin: null, error: true };
    },
  },
});

export const { authSuccess, authRequest, authFailure } = appSlice.actions;

export default appSlice.reducer;
