import { handleFileUpdate } from "@/app/utils/handleFileUpdate";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { RootState } from "@lib/root.reducer";
import {
  schemaPhoto,
  schemaVideo,
  schemaMedia,
} from "@lib/schema/schema-media";
import { FetchStatusEnum } from "@lib/services/fetch.type";
import {
  MediaTypes,
  PublishTypes,
} from "@lib/services/media/media.service.type";
import { mediaActions } from "@lib/slices/media/media.slice";
import { useFormik } from "formik";
import React, { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";

interface EditMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaData: any;
}

const EditMediaModal: React.FC<EditMediaModalProps> = ({
  isOpen,
  onClose,
  mediaData,
}) => {
  const dispatch = useAppDispatch();

  const editMediaFetchStatus = useAppSelector(
    (state: RootState) => state.media.editMediaFetchStatus
  );

  const fileInputRef = useRef(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      handleSave.setFieldValue("mediaFilePath", event.target.files[0]);
    }
  };

  const checkIfVideo = (mediaFilePath: string) => {
    if (mediaFilePath.match(".mp4")) {
      return true;
    }
    return false;
  };

  const handleSave = useFormik({
    enableReinitialize: true,
    initialValues: {
      titleEn: mediaData?.titleEn || "",
      titleBn: mediaData?.titleBn || "",
      subTitleEn: mediaData?.subTitleEn || "",
      subTitleBn: mediaData?.subTitleBn || "",
      mediaFilePath: null,
      mediaType: mediaData?.mediaType || "",
      isPublished: mediaData?.isPublished || "",
    },

    validationSchema:
      (mediaData?.mediaType === MediaTypes.PHOTO && schemaPhoto) ||
      (mediaData?.mediaType === MediaTypes.VEDIO && schemaVideo) ||
      (mediaData?.mediaType === MediaTypes.SLIDER && schemaMedia) ||
      (mediaData?.mediaType === MediaTypes.TVC && schemaMedia),

    onSubmit: async (values) => {
      dispatch(
        mediaActions.editMediaFetch({
          request: {
            id: mediaData.id,
            ...values,
          },
        })
      );
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      handleSave.resetForm();
    },
  });

  mediaData &&
    handleFileUpdate(mediaData?.mediaFilePath, "mediaFilePath", handleSave);

  useEffect(() => {
    if (editMediaFetchStatus === FetchStatusEnum.SUCCESS) {
      toast("Successfully updated media");
      onClose();
      location.reload();
    } else if (editMediaFetchStatus === FetchStatusEnum.ERROR) {
      toast("Failed to update media");
    }
  }, [editMediaFetchStatus, onClose]);

  const { errors, touched, values, handleChange, handleBlur, handleSubmit } =
    handleSave;

  if (!isOpen) return null;

  return (
    <div className="modal show" tabIndex={-1} style={{ display: "block" }}>
      <ToastContainer />
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Media</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-wrapper">
                <label htmlFor="titleBn" className="form-label">
                  Title (Bangla)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="titleBn"
                  name="titleBn"
                  placeholder="Enter Title"
                  value={values.titleBn}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.titleBn && errors.titleBn && (
                  <div className="text-danger">{errors.titleBn.toString()}</div>
                )}
              </div>
              <div className="form-wrapper">
                <label htmlFor="titleEn" className="form-label">
                  Title (English)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="titleEn"
                  name="titleEn"
                  placeholder="Enter Title"
                  value={values.titleEn}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.titleEn && errors.titleEn && (
                  <div className="text-danger">{errors.titleEn.toString()}</div>
                )}
              </div>
              <div className="form-wrapper">
                <label htmlFor="subTitleBn" className="form-label">
                  Subtitle (Bangla)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="subTitleBn"
                  name="subTitleBn"
                  placeholder="Enter Subtitle"
                  value={values.subTitleBn}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.subTitleBn && errors.subTitleBn && (
                  <div className="text-danger">
                    {errors.subTitleBn.toString()}
                  </div>
                )}
              </div>
              <div className="form-wrapper">
                <label htmlFor="subTitleEn" className="form-label">
                  Subtitle (English)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="subTitleEn"
                  name="subTitleEn"
                  placeholder="Enter Subtitle"
                  value={values.subTitleEn}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.subTitleEn && errors.subTitleEn && (
                  <div className="text-danger">
                    {errors.subTitleEn.toString()}
                  </div>
                )}
              </div>
              {(mediaData?.mediaFilePath &&
                checkIfVideo(mediaData.mediaFilePath) && (
                  <div className="mt-2">
                    <video autoPlay loop muted style={{ width: "100%" }}>
                      <source src={mediaData.mediaFilePath} type="video/mp4" />
                    </video>
                  </div>
                )) ||
                (!checkIfVideo(mediaData.mediaFilePath) && (
                  <div className="mt-2">
                    <img
                      src={mediaData.mediaFilePath}
                      alt="MediaFile"
                      width={150}
                      height={100}
                    />
                  </div>
                ))}
              <div className="form-wrapper">
                <label htmlFor="uploadFile" className="form-label">
                  Media
                </label>
                <input
                  type="file"
                  id="uploadFile"
                  className="form-control"
                  name="mediaFilePath"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  onBlur={handleBlur}
                />
                {touched.mediaFilePath && errors.mediaFilePath && (
                  <div className="text-danger">
                    {errors.mediaFilePath.toString()}
                  </div>
                )}
              </div>
              {/* <div className="form-wrapper">
                <label htmlFor="mediaType" className="form-label">
                  Media Type
                </label>
                <select
                  className="form-select"
                  id="mediaType"
                  name="mediaType"
                  value={values.mediaType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value={MediaTypes.PHOTO}>Photo</option>
                  <option value={MediaTypes.VEDIO}>Video</option>
                  <option value={MediaTypes.SLIDER}>Slider</option>
                  <option value={MediaTypes.TVC}>TVC</option>
                </select>
              </div> */}
              <div className="form-wrapper">
                <label htmlFor="isPublished" className="form-label">
                  Published
                </label>
                <select
                  className="form-select"
                  id="isPublished"
                  name="isPublished"
                  value={values.isPublished}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value={PublishTypes.YES}>Yes</option>
                  <option value={PublishTypes.NO}>No</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary me-3"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMediaModal;
