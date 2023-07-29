import { combineReducers } from "@reduxjs/toolkit";
import usersSlice from "./slices/usersSlice";
import cardsSlice from "./slices/cardsSlice";

const Reducer = combineReducers({
  users: usersSlice,
  cards: cardsSlice,
});

export default Reducer;
