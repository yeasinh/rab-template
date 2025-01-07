import * as yup from "yup";

export const publicationSchema = yup.object().shape({
  titleBn: yup.string().trim().required("Title (Bangla) is required"),
  titleEn: yup.string().trim().required("Title (English) is required"),
  authorNameBn: yup.string().required("Author Name (Bangla) is required"),
  authorNameEn: yup.string().required("Author Name (English) is required"),
  publisherBn: yup.string().required("Publisher (Bangla) is required"),
  publisherEn: yup.string().required("Publisher (English) is required"),
  publicationYear: yup.string().required("Publication Year is required"),
  publicationFilePath: yup
    .mixed()
    .required("Publication File is required")
    .test(
      "fileType",
      "Only files are allowed (PDF, TXT, JPG, JPEG, PNG)",
      (value) => {
        if (!value) return true;
        if (value instanceof File) {
          return [
            "application/pdf",
            "text/plain",
            "image/jpg",
            "image/jpeg",
            "image/png",
          ].includes(value.type);
        }
        return false;
      }
    ),
});
