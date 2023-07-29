import styles from "./style.module.css";

export const FilterButtons = () => {
  return (
    <div className={styles.filterButtons}>
      <div className={styles.buttonGroup}>
        <div>All</div>
        <div>Favorites</div>
      </div>
      <div className={styles.buttonGroup}>
        <div>From new to old</div>
        <div>From old to new</div>
      </div>
    </div>
  );
};
