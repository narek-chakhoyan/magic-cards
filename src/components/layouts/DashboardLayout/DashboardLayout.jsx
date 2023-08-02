import { useSelector } from "react-redux";
import styles from "./style.module.css";
import { getAuthUser, getUsers } from "store/redux/slices/usersSlice";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FilterButtons } from "components/features/pages/Feed/FilterButtons/FilterButtons";

const DashboardLayout = ({ children, adminPage }) => {
  const [allUsers, setAllUsers] = useState([]);
  const users = useSelector(getUsers);
  const auth = useSelector(getAuthUser);

  useEffect(() => {
    const filteredUsers = users.filter((user) => user.email !== auth.email);
    setAllUsers(filteredUsers);
  }, [users]);

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
      <div>
        <FilterButtons adminPage={adminPage}/>
        <div className={styles.mainContainer}>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
