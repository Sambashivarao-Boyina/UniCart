import * as yup from "yup";

const signSellerSchema = yup.object({
  email: yup
    .string()
    .required("Enter email")
    .matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$","enter valid email"),
  password: yup
    .string()
    .required("Enter password")
    .trim("It should not be a empty space"),
    
});

export default signSellerSchema;