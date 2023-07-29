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

export const registerUserApi = (user) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const allUsers = JSON.parse(localStorage.getItem("users")) ?? [];
      const isExsists = allUsers.find((registeredUser) => {
        return registeredUser.email === user.email;
      });
      if (isExsists) {
        reject("There was alaready registered user!");
        return;
      }
      allUsers.push(user);
      localStorage.removeItem("users");
      localStorage.setItem("users", JSON.stringify(allUsers));
      const { name, email } = user;
      resolve({ users: allUsers, user: { name, email } });
    }, 2000);
  });
};
