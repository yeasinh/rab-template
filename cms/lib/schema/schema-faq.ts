import * as yup from "yup";

export const faqSchema = yup.object().shape({
  titleBn: yup.string().trim().required("Title (Bangla) is required"),
  titleEn: yup.string().trim().required("Title (English) is required"),
  descriptionBn: yup.string().required("Description (Bangla) is required"),
  descriptionEn: yup.string().required("Description (English) is required"),
});
