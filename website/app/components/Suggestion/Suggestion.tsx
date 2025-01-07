"use client";

import { useAppDispatch } from "@lib/hooks";
import "./Header.scss";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { opinionActions } from "@lib/slices/opinion/opinion.slice";
import { RootState } from "@lib/root.reducer";
import { useSelector } from "react-redux";
import { FetchStatusEnum } from "@lib/services/fetch.type";
import { opinionSchema } from "@lib/schema/schema-opinion";

const SuggestionModal = ({ closeSuggestionPopup }) => {
  const dispatch = useAppDispatch();

  const isEnglish = useSelector((state: RootState) => state.language.isEnglish);

  const createSuggestionStaus = useSelector(
    (state: RootState) => state.opinion.createOpinionFetchStatus
  );

  const createSuggestionError = useSelector(
    (state: RootState) => state.opinion.createOpinionFetchError
  );

  const handleSave = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobileNo: "",
      nid: "",
      description: "",
    },

    validationSchema: opinionSchema,

    onSubmit: async (values, { resetForm }) => {
      try {
        dispatch(
          opinionActions.createOpinionFetch({
            request: {
              ...values,
            },
          })
        );
      } catch (error) {
        console.error("Error:", error);
      }

      if (createSuggestionStaus === FetchStatusEnum.SUCCESS) {
        toast.success("Successfully sent");
      } else if (
        createSuggestionStaus === FetchStatusEnum.FAILURE ||
        createSuggestionError
      ) {
        toast.error("Failed to send. Try again later");
      }

      resetForm();
    },
  });

  return (
    <>
      <div className="suggestion-modal-overlay">
        <div className="suggestion-modal">
          <button className="close-btn" onClick={closeSuggestionPopup}>
            &times;
          </button>
          <h2 className="text-center">
            {isEnglish
              ? "Give your suggestion to RAB"
              : "আপনার পরামর্শ র‍্যাবকে দিন"}
          </h2>
          <form onSubmit={handleSave.handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="name">
                {isEnglish ? "Your Name: " : "আপনার নাম: "}
              </label>
              <input
                id="name"
                type="text"
                placeholder={isEnglish ? "Your Name..." : "আপনার নাম..."}
                name="name"
                value={handleSave.values.name}
                onChange={handleSave.handleChange}
                onBlur={handleSave.handleBlur}
              />
              {handleSave.touched.name && handleSave.errors.name && (
                <div className="text-danger">{handleSave.errors.name}</div>
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">
                {isEnglish ? "Your Email: " : "আপনার ইমেইল: "}
              </label>
              <input
                id="email"
                type="email"
                placeholder="user@email.com"
                name="email"
                value={handleSave.values.email}
                onChange={handleSave.handleChange}
                onBlur={handleSave.handleBlur}
              />
              {handleSave.touched.email && handleSave.errors.email && (
                <div className="text-danger">{handleSave.errors.email}</div>
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="phone">
                {isEnglish ? "Your Phone Number: " : "আপনার ফোন নম্বর: "}
              </label>
              <input
                id="phone"
                type="text"
                placeholder="+880**********"
                name="mobileNo"
                value={handleSave.values.mobileNo}
                onChange={handleSave.handleChange}
                onBlur={handleSave.handleBlur}
              />
              {handleSave.touched.mobileNo && handleSave.errors.mobileNo && (
                <div className="text-danger">{handleSave.errors.mobileNo}</div>
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="nidNumber">
                {isEnglish
                  ? "Your NID Number: "
                  : "আপনার জাতীয় পরিচয়পত্র নম্বর: "}
              </label>
              <input
                id="nidNumber"
                type="text"
                placeholder={
                  isEnglish
                    ? "Your NID Number..."
                    : "আপনার জাতীয় পরিচয়পত্র নাম্বার..."
                }
                name="nid"
                value={handleSave.values.nid}
                onChange={handleSave.handleChange}
                onBlur={handleSave.handleBlur}
              />
              {handleSave.touched.nid && handleSave.errors.nid && (
                <div className="text-danger">{handleSave.errors.nid}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="feedback">
                {isEnglish ? "Your Suggestion: " : "আপনার মতামত: "}{" "}
                <span>*</span>
              </label>
              <textarea
                id="feedback"
                placeholder={
                  isEnglish ? "Your Suggestion..." : "আপনার মতামত..."
                }
                name="description"
                value={handleSave.values.description}
                onChange={handleSave.handleChange}
                onBlur={handleSave.handleBlur}
              ></textarea>
              {handleSave.touched.description &&
                handleSave.errors.description && (
                  <div className="text-danger">
                    {handleSave.errors.description}
                  </div>
                )}
            </div>
            <div className="suggestion-btn-area">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
      ;
    </>
  );
};

export default SuggestionModal;
