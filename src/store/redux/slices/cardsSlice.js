import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCardApi, fackeFetchApi } from "api/fackeFetchApi";

export const getCards = (state) => state.cards.cards;

const initialState = {
  cards: [],
  loading: false,
};

export const createNewCard = createAsyncThunk(
  "cards/createCard",
  async (value,thunkAPI) => {

    const state = thunkAPI.getState();
    console.log(state,"f");

    const createdBy = state.users.auth.email;
    const res = await createCardApi({ ...value, createdBy });
    console.log(res, "here res");
    return res;
  }
)

export const getAllCards = createAsyncThunk(
  "cards/getAllCards",
  async (value) => {
    const res = await fackeFetchApi("cards");
    return res;
  }
);

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCards.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCards.fulfilled, (state, { payload }) => {
        state.cards = payload;
        state.loading = false;
      })
      .addCase(getAllCards.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createNewCard.fulfilled,(state,{payload})=>{
        state.loading = false;
        state.cards = payload
      })
      .addCase(createNewCard.rejected,(state,{payload})=>{
        state.loading = false;
      })
  },
});

export default cardsSlice.reducer;
