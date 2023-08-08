import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import FormInput from "components/common/FormInput/FormInput";

import {
  errorMessage,
  getAuthUser,
  isLoading,
  registerCurrentUser,
  resetErrorMessage,
} from "store/redux/slices/usersSlice";
import signupInputs from "./staticData";
import Loader from "components/common/Loader/Loader";
import styles from "./style.module.css";

export const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const auth = useSelector(getAuthUser);
  const loading = useSelector(isLoading);
  const getError = useSelector(errorMessage);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerCurrentUser({ registerUser: values }));
    dispatch(resetErrorMessage());
  };

  useEffect(() => {
    if (getError.error) {
      dispatch(resetErrorMessage());
    }
  }, []);

  useEffect(() => {
    if (auth?.email) {
      navigate("/");
    }
  }, [auth]);

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupTitle}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore aut
        voluptatum ab et. Iste amet totam non maiores quas ex explicabo nobis!
        Aspernatur architecto nam distinctio nostrum, quae ipsum totam?
      </div>
      <div className={styles.formContainer}>
        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            {getError.error && (
              <h4 className={styles.errorText}>{getError.text}</h4>
            )}
            <h4></h4>
            {signupInputs.map((input) => (
              <FormInput
                {...input}
                key={input.id}
                value={values[input.name]}
                handleChange={handleChange}
              />
            ))}
            <div className={styles.signupBtn}>
              <button>Register</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
