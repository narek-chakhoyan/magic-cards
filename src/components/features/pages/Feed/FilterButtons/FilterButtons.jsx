import {
  getUserCardsById,
  getAllCards,
  getFavoriteCards,
  getNewtoOldCards,
  getOldtoNewCards,
  getFavoritesById,
} from "store/redux/slices/cardsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getAuthUser } from "store/redux/slices/usersSlice";

import styles from "./style.module.css";

export const FilterButtons = ({ userPage }) => {
  const { id } = useParams();
  const auth = useSelector(getAuthUser);
  const dispatch = useDispatch();
  return (
    <div className={styles.filterButtons}>
      <div className={styles.buttonGroup}>
        <div
          onClick={() =>
            userPage
              ? dispatch(getUserCardsById(id ? id : auth.id))
              : dispatch(getAllCards())
          }
        >
          All
        </div>
        <div
          onClick={() => {
            return userPage
              ? dispatch(getFavoritesById(id ? id : auth.id))
              : dispatch(getFavoriteCards())
          } 
            
          }
        >
          Favorites
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <div onClick={() => dispatch(getNewtoOldCards())}>From new to old</div>
        <div onClick={() => dispatch(getOldtoNewCards())}>From old to new</div>
      </div>
    </div>
  );
};
