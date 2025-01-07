import * as yup from "yup";

export const opinionSchema = yup.object().shape({
  name: yup.string(),
  mobileNo: yup
    .string()
    .matches(
      /^(?:\+88)?01[3-9]\d{8}$/,
      "Mobile Number must be a valid Bangladeshi number (11 digits or +88 country code)"
    ),
  email: yup.string().email("Invalid email format"),
  nid: yup.number(),
  description: yup.string().required("Detail is required"),
});
