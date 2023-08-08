import { useState } from "react";
import styles from "./style.module.css";

const FormInput = (props) => {
  const { handleChange, errorMessage, ...inputProps } = props;

  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className={styles.formInput}>
      <div>
        <input
          {...inputProps}
          onChange={handleChange}
          focused={focused.toString()}
          onBlur={handleFocus}
        />
        <div className={styles.errorMessage}>
          <span>{errorMessage}</span>
        </div>
      </div>
    </div>
  );
};

export default FormInput;
