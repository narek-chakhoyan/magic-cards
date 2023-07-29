import { useState } from "react";
import { Navigate } from "react-router";

import FormInput from "components/common/FormInput/FormInput";
import loginInputs from "./staticData";

import styles from "./style.module.css";
import { useSelector } from "react-redux";
import { getAuthUser } from "store/redux/slices/usersSlice";

export const Login = () => {
  const auth = useSelector(getAuthUser);

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
    console.log(values, "here");
  };

  const getAuth = () => {
    return auth ?? JSON.parse(localStorage.getItem("auth"));
  };

  return getAuth()?.email ? (
    <Navigate to="/" replace />
  ) : (
    <div>
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore aut
        voluptatum ab et. Iste amet totam non maiores quas ex explicabo nobis!
        Aspernatur architecto nam distinctio nostrum, quae ipsum totam?
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          {loginInputs.map((input) => (
            <FormInput
              {...input}
              key={input.id}
              value={values[input.name]}
              handleChange={handleChange}
            />
          ))}
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};
