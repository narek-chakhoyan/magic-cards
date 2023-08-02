import { getAdminCards, getAllCards, getFavoriteCards, getNewtoOldCards, getOldtoNewCards } from "store/redux/slices/cardsSlice";
import { useDispatch } from "react-redux";
import styles from "./style.module.css";

export const FilterButtons = ({adminPage}) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.filterButtons}>
      <div className={styles.buttonGroup}>
        <div
          onClick={() =>
            adminPage ? dispatch(getAdminCards()) : dispatch(getAllCards())
          }
        >
          All
        </div>
        <div onClick={() => dispatch(getFavoriteCards())}>Favorites</div>
      </div>
      <div className={styles.buttonGroup}>
        <div onClick={() => dispatch(getNewtoOldCards())}>From new to old</div>
        <div onClick={() => dispatch(getOldtoNewCards())}>From old to new</div>
      </div>
    </div>
  );
};
