"use client";

import "../styles.css";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import { changePasswordSchema } from "@lib/schema/schema-login";
import { useAppSelector } from "@lib/hooks";
import { RootState } from "@lib/root.reducer";
import { FetchStatusEnum } from "@lib/services/fetch.type";
import { changePasswordActions } from "@lib/slices/auth/login/changePassword.slice";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import logo from "../../assets/images/rab-logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword: React.FC = () => {
  const dispatch = useDispatch();

  const changePasswordFetchStatus = useAppSelector(
    (state: RootState) => state.changePassword.changePasswordFetchStatus
  );

  const changePasswordError = useAppSelector(
    (state: RootState) => state.changePassword.changePasswordError
  );

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      rememberToken: "",
      password: "",
    },

    validationSchema: changePasswordSchema,

    onSubmit: (values) => {
      try {
        dispatch(
          changePasswordActions.changePassword({
            request: {
              ...values,
            },
          })
        );
      } catch (error) {
        console.log("Error:", error);
      }

      if (changePasswordFetchStatus === FetchStatusEnum.SUCCESS) {
        redirect("/login");
      } else if (
        changePasswordFetchStatus === FetchStatusEnum.ERROR ||
        changePasswordError
      ) {
        toast("Failed to submit");
      }
    },
  });

  useEffect(() => {
    if (changePasswordFetchStatus === FetchStatusEnum.SUCCESS) {
      redirect("/login");
    } else if (
      changePasswordFetchStatus === FetchStatusEnum.ERROR ||
      changePasswordError
    ) {
      toast("Failed to submit");
    }
  }, [changePasswordFetchStatus, changePasswordError]);

  return (
    <div className="login-background d-flex justify-content-center align-items-center">
      <div className="login-container">
        <div className="my-4 text-center">
          <Image src={logo} alt="rab logo" width={100} height={100} />
          <h2 className="fs-1 mt-2 text-white">Change Password</h2>
          <p className="fs-5 text-white">Enter Details Below</p>
        </div>
        <form className="px-4" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label className="text-white">Email</label>
            <input
              name="email"
              type="email"
              className="form-control input-container"
              placeholder="user@email.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red">{formik.errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <label className="text-white">Reset Code</label>
            <input
              name="rememberToken"
              type="text"
              className="form-control input-container"
              placeholder="Enter the reset code sent to your email"
              value={formik.values.rememberToken}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.rememberToken && formik.errors.rememberToken && (
              <div className="text-red">{formik.errors.rememberToken}</div>
            )}
          </div>
          <div className="form-group">
            <label className="text-white">New Password</label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="form-control input-container"
              placeholder="********"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ paddingRight: "2.5rem" }}
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#6c757d",
                paddingTop: "20px",
                paddingRight: "5px",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red">{formik.errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-success w-100 mt-4 border-2"
            disabled={changePasswordFetchStatus === FetchStatusEnum.FETCHING}
          >
            {changePasswordFetchStatus === FetchStatusEnum.FETCHING
              ? "Resetting..."
              : "Reset Password"}
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
