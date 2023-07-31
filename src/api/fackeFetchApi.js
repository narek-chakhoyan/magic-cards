export const fackeFetchApi = (key) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rendomNum = Math.random();
      if (rendomNum < 0.3) reject();

      const result = localStorage.getItem(key);

      if (!result) {
        localStorage.setItem(key, "[]");
        resolve([]);
      }

      resolve(JSON.parse(result));
    }, 2000);
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
        id,
        createdDate,
      };
      console.log(mappedValues, "mappedValues");
      localStorage.removeItem("cards");
      cards.push(mappedValues);
      localStorage.setItem("cards", JSON.stringify(cards));
      resolve(mappedValues);
    }, 2000);
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
        id
      }
      allUsers.push(mappedValue);
      localStorage.removeItem("users");
      localStorage.setItem("users", JSON.stringify(allUsers));
      const { password, ...data } = mappedValue;
      resolve({ users: allUsers, user: data });
    }, 2000);
  });
};
