export const fackeFetchApi = (key) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // const rendomNum = Math.random();
      // if (rendomNum < 0.3) reject();

      const result = localStorage.getItem(key);

      if (!result) {
        localStorage.setItem(key, "[]");
        resolve([]);
      }

      resolve(JSON.parse(result));
    }, 2000);
  });
};

export const fetchToggleFavorite = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const allCards = JSON.parse(localStorage.getItem("cards"));
      const favoriteCards = allCards.map((card) => {
        if (card.id === id) {
          return { ...card, favorites: !card.favorites };
        }
        return card;
      });
      localStorage.removeItem("cards");
      localStorage.setItem("cards", JSON.stringify(favoriteCards));
      resolve(favoriteCards);
    }, 1000);
  });
};

export const loginUserApi = (loginUser) => {
  return new Promise((resolve, reject) => {
    const data = JSON.parse(localStorage.getItem("users"));
    const currentUser = data.find((user) => user.email === loginUser.email);
    if (!currentUser) {
      reject("There is no user registered");
    }
    const { password, ...lginData } = currentUser;
    resolve(lginData);
  });
};

export const createCardApi = (data) => {
  return new Promise((resolve, reject) => {
    const id = Math.random() * 100;
    // debugger
    const createdDate = new Date();
    setTimeout(() => {
      const cards = JSON.parse(localStorage.getItem("cards"));
      const mappedValues = {
        ...data,
        favorites: false,
        id,
        createdDate,
      };
      console.log(mappedValues, "mappedValues");
      localStorage.removeItem("cards");
      cards.push(mappedValues);
      localStorage.setItem("cards", JSON.stringify(cards));
      resolve(cards);
    }, 2000);
  });
};

export const getAllFavoriteCards = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const allCards = JSON.parse(localStorage.getItem("cards"));
      const favoriteCards = allCards.filter((card) => card.favorites);
      resolve(favoriteCards);
    }, 1000);
  });
};

export const updateCardById = (currentCard) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const allCards = JSON.parse(localStorage.getItem("cards"));
      const updatedCards = allCards.map((card) => {
        if (currentCard.id === card.id) {
          return {
            ...card,
            ...currentCard,
          };
        }
        return card;
      });
      localStorage.removeItem("cards");
      localStorage.setItem("cards", JSON.stringify(updatedCards));
      resolve(updatedCards);
    }, [1000]);
  });
};

// export const fetchNewToOldCardsApi = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const allCards = JSON.parse(localStorage.getItem("cards"));
//       const compareDates = (a, b) =>
//         new Date(b.createdDate) - new Date(a.createdDate);

//       // Sort the dateList in descending order (newest to oldest)
//       const sortedDates = allCards.sort(compareDates);

//       resolve(sortedDates);
//     }, 1000);
//   });
// };

// export const fetchOldToNewCardsApi = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const allCards = JSON.parse(localStorage.getItem("cards"));
//       const compareDates = (a, b) =>
//         new Date(a.createdDate) - new Date(b.createdDate);

//       // Sort the dateList in descending order (newest to oldest)
//       const sortedDates = allCards.sort(compareDates);

//       resolve(sortedDates);
//     }, 1000);
//   });
// };

export const registerUserApi = (user) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const id = Math.random() * 100;
      const allUsers = JSON.parse(localStorage.getItem("users")) ?? [];
      const isExsists = allUsers.find((registeredUser) => {
        return registeredUser.email === user.email;
      });
      if (isExsists) {
        reject("There was alaready registered user!");
        return;
      }
      const mappedValue = {
        ...user,
        id,
      };
      allUsers.push(mappedValue);
      localStorage.removeItem("users");
      localStorage.setItem("users", JSON.stringify(allUsers));
      const { password, ...data } = mappedValue;
      resolve({ users: allUsers, user: data });
    }, 2000);
  });
};
