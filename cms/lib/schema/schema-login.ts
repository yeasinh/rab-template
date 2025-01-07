import * as yup from "yup";

export const loginSchema = yup.object().shape({
  // string prop defines value of input field (it can also be number, date etc.)
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters"),
  // required method takes in message that is returned if user doesn't input anything,
  // email method takes in message that is returned if entered email is invalid
  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),
});

export const changePasswordSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),
  rememberToken: yup.string().required("Verification Code is required"),
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters"),
});
