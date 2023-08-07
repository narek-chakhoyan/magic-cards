import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useDispatch } from "react-redux";

import FormInput from "components/common/FormInput/FormInput";
import loginInputs from "./staticData";

import styles from "./style.module.css";
import { useSelector } from "react-redux";
import {
  errorMessage,
  getAuthUser,
  isLoading,
  loginUser,
  resetErrorMessage,
} from "store/redux/slices/usersSlice";
import Loader from "components/common/Loader/Loader";

export const Login = () => {
  const auth = useSelector(getAuthUser);
  const loading = useSelector(isLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useSelector(errorMessage);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetErrorMessage());
    dispatch(loginUser(values));
  };

  useEffect(() => {
    if (auth?.email) {
      navigate("/");
    }
  }, [auth]);
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginTitle}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore aut
        voluptatum ab et. Iste amet totam non maiores quas ex explicabo nobis!
        Aspernatur architecto nam distinctio nostrum, quae ipsum totam?
      </div>
      <div className={styles.formContainer}>
        {loading ? (
          <Loader />
        ) : (
          <div>
            <h2>Log in</h2>
            {errors.error && (
              <h4 className={styles.errorText}>{errors.text}</h4>
            )}
            <form onSubmit={handleSubmit}>
              {loginInputs.map((input) => (
                <FormInput
                  {...input}
                  key={input.id}
                  value={values[input.name]}
                  handleChange={handleChange}
                />
              ))}
              <div className={styles.rememberBtn}>
                <label htmlFor="rememberme">Remember Me</label>
                <input id="rememberme" type="checkbox" />
              </div>
              <div className={styles.loginBtn}>
                <button>Login</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
