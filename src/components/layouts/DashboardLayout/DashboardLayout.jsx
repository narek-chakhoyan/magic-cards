import { useSelector } from "react-redux";
import styles from "./style.module.css";
import { getAuthUser, getUsers } from "store/redux/slices/usersSlice";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);
  const users = useSelector(getUsers);
  const auth = useSelector(getAuthUser);


  useEffect(()=>{
    const filteredUsers = users.filter((user)=>user.email !== auth.email);
    setAllUsers(filteredUsers);
  },[users]);


  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.usersList}>
        {allUsers.map((user)=>{
          return (
            <h2>
              <NavLink  to={`${user.id}`}>{user.name}</NavLink>
            </h2>
          );
        })} 
      </div>
      <div className={styles.mainContainer}>{children}</div>
    </div>
  );
};

export default DashboardLayout;
