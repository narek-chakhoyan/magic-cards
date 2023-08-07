import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fackeFetchApi, loginUserApi, registerUserApi } from "api/fackeFetchApi";

export const getAuthUser = (state) => state.users.auth;
export const getUsers = (state) => state.users.users;
export const errorMessage = (state) => state.users.errorMessage;
export const isLoading = (state) => state.users.loading;

const initialState = {
  auth: null,
  users: [],
  loading: false,
  errorMessage: {
    error: false,
    text: "",
  },
};

export const getAllUsers = createAsyncThunk("users/getAllUsers", async (value) => {
  const res = await fackeFetchApi("users");
  return res;
});

export const loginUser = createAsyncThunk("users/loginUser",async(value)=>{
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
    resetErrorMessage: (state, action) => {
      state.errorMessage = {
        error: false,
        text: "",
      };
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
      .addCase(registerCurrentUser.rejected, (state,{error}) => {
        state.errorMessage = {
          error: true,
          text: error.message,
        };
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
        state.loading = false;
        state.auth = payload;
      })
      .addCase(loginUser.rejected, (state, { error }) => {
        state.errorMessage = { error: true, text: error.message };
        state.loading = false;
      });
  },
});

export const { resetErrorMessage } = usersSlice.actions;

export default usersSlice.reducer;
