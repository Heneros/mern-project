import { createSlice } from "@reduxjs/toolkit";
import { decodeToken } from 'react-jwt';


const user = JSON.parse(localStorage.getItem("user"))
const googleToken = localStorage.getItem("googleToken");

const decodedToken = decodeToken(googleToken);
const initialState = {
  user: user ? user : decodedToken,
  googleToken: googleToken ? googleToken : null,
  data: null,
  status: "loading",
  isLogged: localStorage.getItem("isLogged")
    ? JSON.parse(localStorage.getItem("isLogged"))
    : null,

};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.isLogged = true;
      localStorage.setItem("isLogged", JSON.stringify(true));
    },
    logIn: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload))
    },
    logout: (state, action) => {
      state.user = null;
      state.googleToken = null;
      state.isLogged = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout, logIn } = authSlice.actions;
export const selectCurrentUserToken = (state) => state.auth.user?.accessToken;
export const selectCurrentUserGoogleToken = (state) => state.auth?.googleToken;
export const authReducer = authSlice.reducer;
