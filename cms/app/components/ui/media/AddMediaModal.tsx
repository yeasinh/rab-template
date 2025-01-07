import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { RootState } from "@lib/root.reducer";
import { FetchStatusEnum } from "@lib/services/fetch.type";
import {
  MediaTypes,
  PublishTypes,
} from "@lib/services/media/media.service.type";
import { toast, ToastContainer } from "react-toastify";
import {
  schemaMedia,
  schemaPhoto,
  schemaVideo,
} from "@lib/schema/schema-media";
import { mediaActions } from "@lib/slices/media/media.slice";

interface AddMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaType: MediaTypes;
}

const AddMediaModal: React.FC<AddMediaModalProps> = ({
  isOpen,
  onClose,
  mediaType,
}) => {
  const dispatch = useAppDispatch();

  const createMediaFetchStatus = useAppSelector(
    (state: RootState) => state.media.createMediaFetchStatus
  );

  const fileInputRef = useRef(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      handleSave.setFieldValue("mediaFilePath", event.target.files[0]);
    }
  };

  const handleSave = useFormik({
    initialValues: {
      titleEn: "",
      titleBn: "",
      subTitleEn: "",
      subTitleBn: "",
      mediaFilePath: null,
      mediaType: mediaType,
      isPublished: PublishTypes.YES,
    },

    validationSchema:
      (mediaType === MediaTypes.PHOTO && schemaPhoto) ||
      (mediaType === MediaTypes.VEDIO && schemaVideo) ||
      (mediaType === MediaTypes.SLIDER && schemaMedia) ||
      (mediaType === MediaTypes.TVC && schemaMedia),

    onSubmit: async (values) => {
      dispatch(
        mediaActions.createMediaFetch({
          request: {
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

  useEffect(() => {
    if (createMediaFetchStatus === FetchStatusEnum.SUCCESS) {
      toast("Successfully created media");
      onClose();
      location.reload();
    } else if (createMediaFetchStatus === FetchStatusEnum.ERROR) {
      toast("Failed to create media");
    }
  }, [createMediaFetchStatus, onClose]);

  const { errors, touched, values, handleChange, handleBlur, handleSubmit } =
    handleSave;

  return (
    <div
      className={`modal fade ${isOpen ? "show d-block" : ""}`}
      tabIndex={-1}
      aria-labelledby="addMediaModalLabel"
    >
      <ToastContainer />
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addMediaModalLabel">
              Add New Media
            </h1>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
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
                  <div className="text-danger">{errors.titleBn}</div>
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
                  <div className="text-danger">{errors.titleEn}</div>
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
                  <div className="text-danger">{errors.subTitleBn}</div>
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
                  <div className="text-danger">{errors.subTitleEn}</div>
                )}
              </div>
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
                <label htmlFor="Published" className="form-label">
                  Published
                </label>
                <select
                  className="form-select"
                  id="Published"
                  name="isPublished"
                  value={handleSave.values.isPublished}
                  onChange={handleSave.handleChange}
                  onBlur={handleSave.handleBlur}
                >
                  <option value={PublishTypes.YES}>Yes</option>
                  <option value={PublishTypes.NO}>No</option>
                </select>
                {handleSave.touched.isPublished &&
                  handleSave.errors.isPublished && (
                    <div className="text-danger">
                      {handleSave.errors.isPublished}
                    </div>
                  )}
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
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMediaModal;
