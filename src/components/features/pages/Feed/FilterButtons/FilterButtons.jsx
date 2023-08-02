import { getUserCardsById, getAllCards, getFavoriteCards, getNewtoOldCards, getOldtoNewCards, getFavoritesById } from "store/redux/slices/cardsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styles from "./style.module.css";
import { getAuthUser } from "store/redux/slices/usersSlice";

export const FilterButtons = ({userPage}) => {
  const { id } = useParams();
  const auth = useSelector(getAuthUser);
  const dispatch = useDispatch();

  console.log(id,"here id");
  console.log(auth,"auth id");
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
          onClick={() =>
            userPage
              ? dispatch(getFavoritesById(id ? id : auth.id))
              : dispatch(getFavoriteCards())
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
