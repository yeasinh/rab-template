import { Icon } from "@iconify/react";
import { useAppDispatch } from "@lib/hooks";
import { RootState } from "@lib/root.reducer";
import { quickContactSchema } from "@lib/schema/schema-quickContact";
import { FetchStatusEnum } from "@lib/services/fetch.type";
import { quickContactActions } from "@lib/slices/quickContact/quickContact.slice";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const QuickContact = () => {
  const dispatch = useAppDispatch();

  const isEnglish = useSelector((state: RootState) => state.language.isEnglish);

  const createQuickContactStaus = useSelector(
    (state: RootState) => state.quickContact.createQuickContactFetchStatus
  );

  const createQuickContactError = useSelector(
    (state: RootState) => state.quickContact.createQuickContactFetchError
  );

  const handleSave = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobileNo: "",
      nid: "",
      message: "",
    },

    validationSchema: quickContactSchema,

    onSubmit: async (values, { resetForm }) => {
      try {
        dispatch(
          quickContactActions.createQuickContactFetch({
            request: {
              ...values,
            },
          })
        );
      } catch (error) {
        console.error("Error:", error);
      }

      if (createQuickContactStaus === FetchStatusEnum.SUCCESS) {
        toast.success("Successfully sent");
      } else if (
        createQuickContactStaus === FetchStatusEnum.FAILURE ||
        createQuickContactError
      ) {
        toast.error("Failed to send. Try again later");
      }

      resetForm();
    },
  });

  return (
    <div className="col-lg-5 mt-4 mt-lg-0">
      <div className="footer-form">
        <h2>Quick Contact</h2>
        <form onSubmit={handleSave.handleSubmit}>
          <div className="d-flex align-items-center gap-2">
            <input
              type="text"
              id="Name"
              placeholder="Name..."
              name="name"
              value={handleSave.values.name}
              onChange={handleSave.handleChange}
              onBlur={handleSave.handleBlur}
            />
            {handleSave.touched.name && handleSave.errors.name && (
              <div className="text-danger">{handleSave.errors.name}</div>
            )}
            <input
              type="text"
              id="Nid"
              placeholder="NID..."
              name="nid"
              value={handleSave.values.nid}
              onChange={handleSave.handleChange}
              onBlur={handleSave.handleBlur}
            />
            {handleSave.touched.nid && handleSave.errors.nid && (
              <div className="text-danger">{handleSave.errors.nid}</div>
            )}
          </div>
          <div className="d-flex align-items-center gap-2">
            <input
              type="text"
              id="MobileNo"
              placeholder="Mobile..."
              name="mobileNo"
              value={handleSave.values.mobileNo}
              onChange={handleSave.handleChange}
              onBlur={handleSave.handleBlur}
            />
            {handleSave.touched.mobileNo && handleSave.errors.mobileNo && (
              <div className="text-danger">{handleSave.errors.mobileNo}</div>
            )}
            <input
              type="email"
              placeholder="Email..."
              name="email"
              value={handleSave.values.email}
              onChange={handleSave.handleChange}
              onBlur={handleSave.handleBlur}
            />
            {handleSave.touched.email && handleSave.errors.email && (
              <div className="text-danger">{handleSave.errors.email}</div>
            )}
          </div>
          <textarea
            rows={3}
            placeholder="Message..."
            id="Message"
            name="message"
            value={handleSave.values.message}
            onChange={handleSave.handleChange}
            onBlur={handleSave.handleBlur}
          ></textarea>
          {handleSave.touched.message && handleSave.errors.message && (
            <div className="text-danger">{handleSave.errors.message}</div>
          )}
          <div className="footer-form-btn">
            <button type="submit">
              Send
              <Icon icon="fa:paper-plane" width="14px" height="14px" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickContact;
