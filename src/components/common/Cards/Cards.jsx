import { useCallback ,useState} from "react";

import { getAuthUser, getUsers } from "store/redux/slices/usersSlice";
import { useSelector, useDispatch } from "react-redux";

import styles from "./style.module.css";
import { toToggleFavorite, updateCurrentCard } from "store/redux/slices/cardsSlice";

export const Cards = ({ allCards,adminPage }) => {
  const [editCard, setEditCard] = useState(null);
  const auth = useSelector(getAuthUser);
  const users = useSelector(getUsers);
  const dispatch = useDispatch();

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
    dispatch(updateCurrentCard({editCard,adminPage}));
    setEditCard(null);
  };

  const toggleFavorite = (id) => {
    dispatch(toToggleFavorite(id));
  };
  const handleEditCard = (card) => {
    setEditCard(card);
  };

  const getCreatedDate = (date) => {
    const dateObject = new Date(date);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
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
        component.title = <p>{card?.title}</p>;
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
            <div>
              <button onClick={handleUpdateCard}>Save</button>
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
    [editCard, auth]
  );
  return (
    <div className={styles.cardContainer}>
      {allCards?.map((card) => {
        return (
          <div
            style={{
              backgroundColor: card?.authorId === auth?.id ? "green" : "white",
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
  );
};
