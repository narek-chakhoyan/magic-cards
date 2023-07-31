import styles from "./style.module.css";

export const CardModal = ({ open, toggle, children }) => {
   return (
     open && (
       <div className={styles.cardModal}>
         <div onClick={toggle}>close</div>
         <div>{children}</div>
       </div>
     )
   );
};