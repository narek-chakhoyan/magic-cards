const signupInputs = [
  {
    id: 0,
    name: "name",
    type: "name",
    placeholder: "Name",
    errorMessage: "It should include only letters.",
    pattern: "[A-Za-z]{3,20}",
    required: true,
  },
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
    type: "text",
    placeholder: "Password",
    errorMessage: "Password should be 4-40 characters.",
    pattern: "^[A-Za-z0-9]{4,40}",
    required: true,
  },
];
  
  export default signupInputs;