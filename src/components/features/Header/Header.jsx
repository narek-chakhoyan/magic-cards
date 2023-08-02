import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CardModal } from "components/common/CardModal/CardModal";
import { createNewCard } from "store/redux/slices/cardsSlice";

import styles from "./header.module.css";
import { getAuthUser } from "store/redux/slices/usersSlice";

export const Header = () => {
  const auth = useSelector(getAuthUser);
  const location = useLocation();
  const { pathname } = location;
  const [cardValues, setCardValues] = useState({
    title: "",
    description: "",
  });
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const openCreateCardModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handleChange = (e) => {
    setCardValues({
      ...cardValues,
      [e.target.name]: e.target.value,
    });
  };

  const createCard = () => {
    dispatch(createNewCard(cardValues));
  };

  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <NavLink to="/">MegicCards</NavLink>
        </div>
        <div className={styles.iterationButtons}>
          {auth ? (
            <div className={styles.profileButtons}>
              <div>
                <NavLink to="/profile">Profile</NavLink>
              </div>

              <div onClick={openCreateCardModal}>Create Card</div>
            </div>
          ) : pathname === "/login" ? (
            <NavLink to="/signup">Signup</NavLink>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </div>
      </nav>
      <CardModal open={openModal} toggle={openCreateCardModal}>
        <div>
          <input
            name="title"
            onChange={handleChange}
            placeholder="Title"
            type="text"
          />
        </div>
        <div>
          <textarea
            name="description"
            onChange={handleChange}
            placeholder="Description"
          ></textarea>
        </div>
        <button>Cancel</button>
        <button onClick={createCard}>Create</button>
      </CardModal>
    </header>
  );
};
