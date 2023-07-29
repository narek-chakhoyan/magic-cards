import { useState } from "react";
import styles from "./style.module.css";

const FormInput = (props) => {
  const { handleChange, errorMessage, ...inputProps } = props;

  const [focused, setFocused] = useState(false);
  
  const handleFocus =()=>{
    setFocused(true);
  }

  return (
    <div className={styles.formInput}>
      <input
        {...inputProps}
        onChange={handleChange}
        focused={focused.toString()}
        onBlur = {handleFocus}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
