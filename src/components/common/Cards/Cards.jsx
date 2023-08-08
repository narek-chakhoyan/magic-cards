import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getAuthUser, getUsers } from "store/redux/slices/usersSlice";
import {
  toToggleFavorite,
  updateCurrentCard,
} from "store/redux/slices/cardsSlice";
import styles from "./style.module.css";

export const Cards = ({ allCards, adminPage }) => {
  const [editCard, setEditCard] = useState(null);
  const auth = useSelector(getAuthUser);
  const users = useSelector(getUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAuthorName = (id) => {
    return users.find((user) => user.id === id);
  };

  const handleChange = (e) => {
    setEditCard({
      ...editCard,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateCard = () => {
    dispatch(updateCurrentCard({ editCard, adminPage }));
    setEditCard(null);
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
        component.title = (
          <input name="title" onChange={handleChange} value={editCard.title} />
        );
      } else {
        component.title = <h3>{card?.title}</h3>;
      }

      if (editCard?.description && editCard?.id === card.id) {
        component.description = (
          <textarea
            name="description"
            onChange={handleChange}
            value={editCard.description}
          />
        );
      } else {
        component.description = <p>{card?.description}</p>;
      }
      if (card?.authorId === auth.id) {
        if (editCard && editCard?.id === card.id) {
          component.buttons = (
            <div className={styles.actionButtons}>
              <button onClick={handleUpdateCard}>Save</button>
              <button onClick={() => setEditCard({})}>Cancel</button>
            </div>
          );
        } else {
          component.buttons = (
            <div className={styles.actionButtons}>
              <button onClick={() => handleEditCard(card)}>Edit</button>
            </div>
          );
        }
      }
      return (
        <>
          <div className={styles.cardTitleContainer}>
            <div>{component.title}</div>
            <div>{component.description}</div>
          </div>
          <div>{component.buttons}</div>
        </>
      );
    },
    [editCard, auth]
  );
  return (
    <div className={styles.cardContainer}>
      {allCards.length
        ? allCards?.map((card) => {
            return (
              <div
                key={card.id}
                style={{
                  backgroundColor:
                    card?.authorId === auth?.id ? "antiquewhite" : "white",
                }}
              >
                <div className={styles.cardSection1}>
                  <div>{getCardTitleDescription(card)}</div>
                  <p>{card?.createdDate}</p>
                </div>
                <div className={styles.sectionButtons}>
                  <p>Author: {getAuthorName(card?.authorId)?.name}</p>
                  <div>
                    <label>Favorite</label>
                    <input
                      onChange={() => {
                        navigate("/");
                        return toggleFavorite(card.id);
                      }}
                      type="checkbox"
                      checked={card?.favorites}
                    />
                  </div>
                </div>
              </div>
            );
          })
        : "There are no cards in the system"}
    </div>
  );
};
