import { NavLink } from "react-router-dom";
import styles from "./header.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { CardModal } from "components/common/CardModal/CardModal";
import { createNewCard } from "store/redux/slices/cardsSlice";

export const Header = () => {
  const [cardValues, setCardValues] = useState({
    title: "",
    description: "",
  });
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  
  const openCreateCardModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handleChange =(e)=>{
    setCardValues({
      ...cardValues,
      [e.target.name]: e.target.value,
    });
  }

  const createCard =()=>{
    dispatch(createNewCard( cardValues ));
  }


  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <NavLink to="/">MegicCards</NavLink>
        </div>

        <div>
          <NavLink to="/profile">Profile</NavLink>
          <div onClick={openCreateCardModal}>Create Card</div>
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
