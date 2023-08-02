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

export const fetchUserAllCardsById = (id) => {
  console.log(id,"kkkk");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const allCards = JSON.parse(localStorage.getItem("cards"));
      const userCards = allCards.filter((card) => {
        if (+card.authorId === +id) {
          return card;
        }
      });
      console.log(userCards,"userCards")
      resolve(userCards);
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
        favorites: true,
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

export const getAllFavoriteCardsById =(userId)=>{
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const allCards = JSON.parse(localStorage.getItem("cards"));
      const favoriteCards = allCards.filter((card) => {
        if(userId === card.authorId && card.favorites){
          return card;
        }
      });
      resolve(favoriteCards);
    }, 1000);
  });
}

export const updateCardById = (values) => {
  console.log(values,"ddddd")
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const allCards = JSON.parse(localStorage.getItem("cards"));
      const updatedCards = allCards.map((card) => {
        if (values.editCard.id === card.id) {
          return {
            ...card,
            ...values.editCard,
          };
        }
        return card;
      });
      localStorage.removeItem("cards");
      localStorage.setItem("cards", JSON.stringify(updatedCards));
      if (values.adminPage) {
        const adminCards = updatedCards.filter((card) => {
          return card.authorId === values.id;
        });
        resolve(adminCards);
        return;
      }
      resolve(updatedCards);
    }, [1000]);
  });
};

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
