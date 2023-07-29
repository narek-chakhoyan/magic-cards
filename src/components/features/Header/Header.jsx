import { NavLink } from "react-router-dom";
import styles from "./header.module.css";

export const Header = () => {
  // const getAuth = () => {
  //   return auth ?? JSON.parse(localStorage.getItem("auth"));
  // };
  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <NavLink to="/">MegicCards</NavLink>
        </div>

        <div className={styles.navTitles}>ssasa</div>
        <NavLink to="/profile">Profile</NavLink>
      </nav>
    </header>
  );
};
