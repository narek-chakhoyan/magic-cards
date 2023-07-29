import styles from "./style.module.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.usersList}>
        <h2>Poxos</h2>
        <h2>Petros</h2>
      </div>
      <div className={styles.mainContainer}>{children}</div>
    </div>
  );
};

export default DashboardLayout;
