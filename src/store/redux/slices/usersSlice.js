import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fackeFetchApi, loginUserApi, registerUserApi } from "api/fackeFetchApi";

export const getAuthUser = (state) => state.users.auth;
export const getUsers = (state) => state.users.users;

const initialState = {
  auth: null,
  users: [],
  loading: false,
};

export const getAllUsers = createAsyncThunk("users/getAllUsers", async (value) => {
  const res = await fackeFetchApi("users");
  return res;
});

export const loginUser = createAsyncThunk("users/loginUser",async(value)=>{
  console.log(3333)
  const res = await loginUserApi(value);
  return res;
})

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
      .addCase(registerCurrentUser.fulfilled, (state, { payload }) => {
        state.users = payload.users;
        state.auth = payload.user;
        state.loading = false;
      })
      .addCase(registerCurrentUser.rejected, (state) => {
        console.log("rejected");
        state.loading = false;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.loading = false;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        console.log(payload, "payload here");
        state.loading = false;
        state.auth = payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setStatusTest } = usersSlice.actions;

export default usersSlice.reducer;
