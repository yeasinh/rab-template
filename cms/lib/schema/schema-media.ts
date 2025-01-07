import * as yup from "yup";

export const schemaMedia = yup.object().shape({
  titleBn: yup.string().trim().required("Title (Bangla) is required"),
  titleEn: yup.string().trim().required("Title (English) is required"),
  subTitleBn: yup.string().required("Subtitle (Bangla) is required"),
  subTitleEn: yup.string().required("Subtitle (English) is required"),
  mediaFilePath: yup.mixed().nullable().required("Media File is required"),
});

export const schemaPhoto = yup.object().shape({
  titleBn: yup.string().trim().required("Title (Bangla) is required"),
  titleEn: yup.string().trim().required("Title (English) is required"),
  subTitleBn: yup.string().required("Subtitle (Bangla) is required"),
  subTitleEn: yup.string().required("Subtitle (English) is required"),
  mediaFilePath: yup
    .mixed()
    .required("Media File is required")
    .test(
      "fileType",
      "Only image files are allowed (JPG, JPEG, PNG, GIF, SVG, BMP, WebP)",
      (value) => {
        if (!value) return true;
        if (value instanceof File) {
          return [
            "image/jpg",
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/svg+xml",
            "image/bmp",
            "image/webp",
          ].includes(value.type);
        }
        return false;
      }
    ),
});

export const schemaVideo = yup.object().shape({
  titleBn: yup.string().trim().required("Title (Bangla) is required"),
  titleEn: yup.string().trim().required("Title (English) is required"),
  subTitleBn: yup.string().required("Subtitle (Bangla) is required"),
  subTitleEn: yup.string().required("Subtitle (English) is required"),
  mediaFilePath: yup
    .mixed()
    .required("Media File is required")
    .test(
      "fileType",
      "Only video files are allowed (MP4, AVI, MKV, MOV, WMV, FLV, WebM)",
      (value) => {
        return (
          value &&
          value instanceof File &&
          [
            "video/mp4",
            "video/avi",
            "video/mkv",
            "video/quicktime",
            "video/x-ms-wmv",
            "video/x-flv",
            "video/webm",
          ].includes(value.type)
        );
      }
    ),
});
