import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import {
  createCardApi,
  fackeFetchApi,
  fetchNewToOldCardsApi,
  fetchOldToNewCardsApi,
  getAllFavoriteCards,
} from "api/fackeFetchApi";

export const getCards = (state) => state.cards.cards;

// export const selectCardById = createSelector(
//   [getCards, (state, id) => id],
//   (cards, id) => {
//     if (id !== undefined) {
//       return cards.filter((card) => card.id === id);
//     }
//     return cards;
//   }
// );

const initialState = {
  cards: [],
  loading: false,
};

export const createNewCard = createAsyncThunk(
  "cards/createCard",
  async (value, thunkAPI) => {
    const state = thunkAPI.getState();
    console.log(state, "f");

    const authorId = state.users.auth.id;
    const res = await createCardApi({ ...value, authorId });
    console.log(res, "here res");
    return res;
  }
);

export const getFavoriteCards = createAsyncThunk(
  "cards/getFavoriteCards",
  async (value, thunkAPI) => {
    const state = thunkAPI.getState();
    console.log(state, "f");

    const authorId = state.users.auth.id;
    const res = await getAllFavoriteCards({ ...value, authorId });
    console.log(res, "here res");
    return res;
  }
);

export const getAllCards = createAsyncThunk(
  "cards/getAllCards",
  async (value) => {
    const res = await fackeFetchApi("cards");
    return res;
  }
);

export const getNewtoOldCards = createAsyncThunk(
  "cards/getNewtoOldCards",
  async (value) => {
    const res = await fetchNewToOldCardsApi();
    return res;
  }
);

export const getOldtoNewCards = createAsyncThunk(
  "cards/getOldtoNewCards",
  async (value) => {
    const res = await fetchOldToNewCardsApi();
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
      .addCase(createNewCard.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(createNewCard.fulfilled, (state, { payload }) => {
        console.log(payload, "payload");
        state.loading = false;
        state.cards = payload;
      })
      .addCase(createNewCard.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getFavoriteCards.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getFavoriteCards.fulfilled, (state, { payload }) => {
        console.log(payload, " getFavoriteCards payload");
        state.loading = false;
        state.cards = payload;
      })
      .addCase(getFavoriteCards.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getNewtoOldCards.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getNewtoOldCards.fulfilled, (state, { payload }) => {
        console.log(payload, " getFavoriteCards payload");
        state.loading = false;
        state.cards = payload;
      })
      .addCase(getNewtoOldCards.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getOldtoNewCards.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getOldtoNewCards.fulfilled, (state, { payload }) => {
        console.log(payload, " getFavoriteCards payload");
        state.loading = false;
        state.cards = payload;
      })
      .addCase(getOldtoNewCards.rejected, (state, { payload }) => {
        state.loading = false;
      });
  },
});

export default cardsSlice.reducer;
