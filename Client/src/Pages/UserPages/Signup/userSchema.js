import * as yup from "yup";

const userSchema = yup.object({
  username: yup
    .string()
    .required("Enter username")
    .trim("user name should not empty")
    .min(6, "Username length atleast 6 chars"),
  email: yup
    .string()
    .required("Enter email")
    .matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$","Enter valid email"),
  password: yup
    .string()
    .required("Enter password")
    .trim("It should not be a empty space")
    .min(6,"Atleast 6 characters"),
});

export default userSchema;