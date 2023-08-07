import { useSelector } from "react-redux";
import styles from "./style.module.css";
import { getAuthUser, getUsers } from "store/redux/slices/usersSlice";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FilterButtons } from "components/features/pages/Feed/FilterButtons/FilterButtons";
import { loadingCards } from "store/redux/slices/cardsSlice";
import Loader from "components/common/Loader/Loader";

const DashboardLayout = ({ children, userPage }) => {
  const [allUsers, setAllUsers] = useState([]);
  const users = useSelector(getUsers);
  const auth = useSelector(getAuthUser);
  const cardsLoading = useSelector(loadingCards);

  useEffect(() => {
    const filteredUsers = users.filter((user) => user.email !== auth.email);
    setAllUsers(filteredUsers);
  }, [users]);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.usersList}>
        {allUsers.length
          ? allUsers?.map((user) => {
              return (
                <h2 key={user.id}>
                  <NavLink to={`/profile/${user.id}`}>{user.name}</NavLink>
                </h2>
              );
            })
          : "There are no users in the system"}
      </div>
      <div className={styles.filterButtons}>
        <FilterButtons userPage={userPage} />

        <div className={styles.mainContainer}>
          {cardsLoading ? (
            <div className={styles.loaderCard}>
              
              <Loader />
            </div>
          ) : (
            <div>{children}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
