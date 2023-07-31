import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "components/layouts/DashboardLayout/DashboardLayout";
import { FilterButtons } from "./FilterButtons/FilterButtons";

import { getAllUsers, getAuthUser, getUsers } from "store/redux/slices/usersSlice";
import {
  getAllCards,
  getCards,
  // selectCardById,
} from "store/redux/slices/cardsSlice";

import styles from "./style.module.css";

export const Feed = () => {
  const dispatch = useDispatch();
  // const allCards = useSelector((state) =>
  //   selectCardById(state)
  // );
  const allCards = useSelector(getCards);
  const auth = useSelector(getAuthUser);
  const users = useSelector(getUsers);

  console.log("here", allCards);

  const getAuthorName = (id) => {
    return users.find((user) => user.id === id);
  };

  const getCreatedDate =(date)=>{
    const dateObject = new Date(date);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    
    return `${year}-${month}-${day}`;
   
  }

  useEffect(() => {
    dispatch(getAllCards());
    dispatch(getAllUsers());
  }, []);

  console.log(allCards, "all cards");
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
                    card.authorId === auth.id ? "green" : "white",
                }}
              >
                <p>{card.title}</p>
                <p>{card.description}</p>
                <p>Author:{getAuthorName(card.authorId)?.name}</p>
                <p>{getCreatedDate(card?.createdDate)}</p>
                {card.authorId === auth.id && <div>Edit</div>}
              </div>
            );
          })}
        </div>
      </DashboardLayout>
    </div>
  );
};
