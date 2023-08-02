import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import {
  createCardApi,
  fackeFetchApi,
  fetchAdminAllCards,
  fetchToggleFavorite,
  fetchUserAllCardsById,
  getAllFavoriteCards,
  getAllFavoriteCardsById,
  updateCardById,
} from "api/fackeFetchApi";
import thunk from "redux-thunk";

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
export const getFavoritesById = createAsyncThunk(
  "cards.getFavoritesById",
  async (id) =>{
    const res = await getAllFavoriteCardsById(id);
    return res;
  }
)

export const updateCurrentCard = createAsyncThunk(
  "card/updateCurrentCard",
  async (value, thunkAPI) => {
    const state = thunkAPI.getState();
    console.log(state, "f");

    const authorId = state.users.auth.id;
    const res = await updateCardById({ ...value, id: authorId });
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

export const toToggleFavorite = createAsyncThunk(
  "cards/toToggleFavorite",
  async (value) => {
    const res = await fetchToggleFavorite(value);
    return res;
  }
);

export const getUserCardsById = createAsyncThunk(
  "cards/getUserCardsById",
  async (id, thunkAPI) => {
    
    console.log(id, "thunk");
    // const userId = value.userId ? value.userId : state.users.auth.id;
    const res = await fetchUserAllCardsById(id);
    return res;
  }
);

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    getNewtoOldCards: (state) => {
      const allCards = state.cards;
      const compareDates = (a, b) =>
        new Date(b.createdDate) - new Date(a.createdDate);
      const sortedDates = allCards.sort(compareDates);
      state.cards = sortedDates;
    },
    getOldtoNewCards: (state) => {
      const allCards = state.cards;
      const compareDates = (a, b) =>
        new Date(a.createdDate) - new Date(b.createdDate);
      const sortedDates = allCards.sort(compareDates);
      state.cards = sortedDates;
    },
  },
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
      .addCase(toToggleFavorite.pending, (state) => {
        state.loading = true;
      })
      .addCase(toToggleFavorite.fulfilled, (state, { payload }) => {
        console.log(payload, "here pppp");
        state.loading = false;
        state.cards = payload;
      })
      .addCase(toToggleFavorite.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateCurrentCard.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCurrentCard.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cards = payload;
      })
      .addCase(updateCurrentCard.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUserCardsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserCardsById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cards = payload;
      })
      .addCase(getUserCardsById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { getNewtoOldCards, getOldtoNewCards } = cardsSlice.actions;

export default cardsSlice.reducer;
