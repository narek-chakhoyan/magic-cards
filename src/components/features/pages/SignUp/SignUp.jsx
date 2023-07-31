import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import FormInput from "components/common/FormInput/FormInput";
import {
  getAuthUser,
  registerCurrentUser,
} from "store/redux/slices/usersSlice";
import signupInputs from "./staticData";

import styles from "./style.module.css";
import { useNavigate } from "react-router";

export const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const auth = useSelector(getAuthUser);
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
  };

  useEffect(()=>{
    if(auth?.email){
      navigate("/");
    }
  },[auth]);

  return  (
    <div>
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore aut
        voluptatum ab et. Iste amet totam non maiores quas ex explicabo nobis!
        Aspernatur architecto nam distinctio nostrum, quae ipsum totam?
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          {signupInputs.map((input) => (
            <FormInput
              {...input}
              key={input.id}
              value={values[input.name]}
              handleChange={handleChange}
            />
          ))}
          <button>Register</button>
        </form>
      </div>
    </div>
  );
};
