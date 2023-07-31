import { useSelector } from "react-redux";
import styles from "./style.module.css";
import { getAuthUser, getUsers } from "store/redux/slices/usersSlice";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);
  const users = useSelector(getUsers);
  const auth = useSelector(getAuthUser);

  console.log(users, "get All Users");
  
  useEffect(()=>{
    const filteredUsers = users.filter((user)=>user.email !== auth.email);
    setAllUsers(filteredUsers);
  },[users]);

console.log(allUsers,"allUsers");
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.usersList}>
        <h3>Users all</h3>
        {allUsers?.map((user) => {
          return (
            <h2>
              <NavLink to={`${user.id}`}>{user.name}</NavLink>
            </h2>
          );
        })}
      </div>
      <div className={styles.mainContainer}>{children}</div>
    </div>
  );
};

export default DashboardLayout;
