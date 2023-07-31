import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "components/layouts/DashboardLayout/DashboardLayout";
import { FilterButtons } from "./FilterButtons/FilterButtons";

import { getAllUsers, getAuthUser } from "store/redux/slices/usersSlice";
import { getAllCards, getCards } from "store/redux/slices/cardsSlice";

import styles from "./style.module.css";

export const Feed = () => {
  const dispatch = useDispatch();
  const allCards = useSelector(getCards);
  const auth = useSelector(getAuthUser);
  useEffect(() => {
    dispatch(getAllCards());
    dispatch(getAllUsers());
  }, []);
  console.log(allCards,"all cards")
  return (
    <div>
      <DashboardLayout>
        <FilterButtons />
        <div className={styles.cardContainer}>
          {allCards?.map((card) => {
            return (
              <div
                style={{
                  backgroundColor:
                    card.createdBy === auth.email ? "green" : "white",
                }}
              >
                <p>{card.title}</p>
                <p>{card.description}</p>
              </div>
            );
          })}
        </div>
      </DashboardLayout>
    </div>
  );
};
