import styles from "./style.module.css";

export const CardModal = ({ open, toggle, children }) => {
  return (
    open && (
      <div className={styles.cardModal}>
        <div className={styles.closeBtn} onClick={toggle}>
          <div className={styles.closeIcon}>&#x2715;</div>
        </div>
        <div className={styles.modalContainer}>
          <div>{children}</div>
        </div>
      </div>
    )
  );
};
