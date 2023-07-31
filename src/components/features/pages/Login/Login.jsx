import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useDispatch } from "react-redux";

import FormInput from "components/common/FormInput/FormInput";
import loginInputs from "./staticData";

import styles from "./style.module.css";
import { useSelector } from "react-redux";
import { getAuthUser, loginUser } from "store/redux/slices/usersSlice";

export const Login = () => {
  const auth = useSelector(getAuthUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(loginUser(values));
  };

  useEffect(() => {
    if (auth?.email) {
      navigate("/");
    }
  }, [auth]);

  return (
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
