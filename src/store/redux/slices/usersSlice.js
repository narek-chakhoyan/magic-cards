import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerUserApi } from "api/fackeFetchApi";

export const getAuthUser = (state) => state.users.auth;

const initialState = {
  auth: null,
  users: [],
  loading: false,
};

export const registerCurrentUser = createAsyncThunk(
  "users/registerUser",
  async (value) => {
      const res = await registerUserApi(value.registerUser);
      if(res.user){
        localStorage.setItem("auth", JSON.stringify(res.user));
      }
      return res;
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setStatusTest: (state, action) => {
      state.test = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerCurrentUser.fulfilled, (state, {payload}) => {
        state.users = payload.users;
        state.auth = payload.user;
        state.loading = false;
      })
      .addCase(registerCurrentUser.rejected, (state) => {
        console.log("rejected");
        state.loading = false;
      });
  },
});

export const { setStatusTest } = usersSlice.actions;

export default usersSlice.reducer;
