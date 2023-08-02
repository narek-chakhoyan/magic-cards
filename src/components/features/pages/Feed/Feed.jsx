import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "components/layouts/DashboardLayout/DashboardLayout";
import { FilterButtons } from "./FilterButtons/FilterButtons";

import {
  getAllUsers,
  getAuthUser,
  getUsers,
} from "store/redux/slices/usersSlice";
import {
  getAllCards,
  getCards,
  toToggleFavorite,
  updateCurrentCard,
} from "store/redux/slices/cardsSlice";

import { Cards } from "components/common/Cards/Cards";
import styles from "./style.module.css";


export const Feed = () => {
  const dispatch = useDispatch();

  const allCards = useSelector(getCards);

  useEffect(() => {
    dispatch(getAllCards());
    dispatch(getAllUsers());
  }, []);

  return (
    <div>
      <DashboardLayout adminPage={false}>
        <Cards allCards={allCards} adminPage={false}/>
      </DashboardLayout>
    </div>
  );
};
