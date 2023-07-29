const loginInputs = [
  {
    id: 1,
    name: "email",
    type: "email",
    placeholder: "Email",
    errorMessage: "It should be a valid email.",
    required: true,
  },
  {
    id: 2,
    name: "password",
    type: "password",
    placeholder: "Password",
    errorMessage: "Password should be 6-10 characters.",
    pattern: "^[A-Za-z0-9]{3,20}",
    required: true,
  },
];

export default loginInputs;