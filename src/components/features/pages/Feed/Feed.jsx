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

import styles from "./style.module.css";

export const Feed = () => {
  const [editCard, setEditCard] = useState(null);
  const dispatch = useDispatch();

  const allCards = useSelector(getCards);
  const auth = useSelector(getAuthUser);
  const users = useSelector(getUsers);


  const getAuthorName = (id) => {
    return users.find((user) => user.id === id);
  };

  const handleChange =(e)=>{
    setEditCard({
      ...editCard,
      [e.target.name]: e.target.value,
    });
  }

  const handleUpdateCard = () => {
    dispatch(updateCurrentCard(editCard));
    setEditCard(null);
  };

  const getCreatedDate = (date) => {
    const dateObject = new Date(date);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const toggleFavorite = (id) => {
    dispatch(toToggleFavorite(id));
  };
  const handleEditCard = (card) => {
    setEditCard(card);
  };


  const getCardTitleDescription = useCallback(
    (card) => {
      const component = {
        title: "",
        description: "",
        buttons: "",
      };
      
      if (editCard?.title && editCard?.id === card.id) {
        component.title = <input name = "title" onChange = {handleChange} value={editCard.title} />;
      } else {
        component.title = <p>{card?.title}</p>;
      }

      if (editCard?.description && editCard?.id === card.id) {
        component.description = <textarea name = "description" onChange = {handleChange} value={editCard.description} />;
      } else {
        component.description = <p>{card?.description}</p>;
      }
      if (card?.authorId === auth.id ) {
        if (editCard && editCard?.id === card.id) {
          component.buttons = (
            <div>
              <button onClick={handleUpdateCard}>
                Save
              </button>
              <button onClick={() => setEditCard({})}>Cancel</button>
            </div>
          );
        } else {
          component.buttons = (
            <div>
              <button onClick={() => handleEditCard(card)}>Edit</button>
            </div>
          );
        }
      }
      return (
        <>
          {component.title}
          {component.description}
          {component.buttons}
        </>
      );
    },
    [editCard,auth]
  );

  useEffect(() => {
    dispatch(getAllCards());
    dispatch(getAllUsers());
  }, []);

  console.log(allCards, "all cards");
  return (
    <div>
      <DashboardLayout>

        <div className={styles.cardContainer}>
          {allCards?.map((card) => {
            return (
              <div
                style={{
                  backgroundColor:
                    card?.authorId === auth?.id ? "green" : "white",
                }}
              >
                {getCardTitleDescription(card)}
                <p>Author:{getAuthorName(card?.authorId)?.name}</p>
                <p>{getCreatedDate(card?.createdDate)}</p>
                <div>
                  <lable>Favorite</lable>
                  <input
                    onClick={() => toggleFavorite(card.id)}
                    type="checkbox"
                    checked={card?.favorites}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </DashboardLayout>
    </div>
  );
};
