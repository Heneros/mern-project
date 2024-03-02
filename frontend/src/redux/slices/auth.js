import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
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
    logout: (state, action) => {
      state.isLogged = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials , logout} = authSlice.actions;
export const authReducer = authSlice.reducer;
