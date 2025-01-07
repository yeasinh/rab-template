"use client";

import "../styles.css";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import { forgotPasswordSchema } from "@lib/schema/schema-login";
import { useDispatch } from "react-redux";
import { forgotPasswordActions } from "@lib/slices/auth/login/forgotPassword.slice";
import { useAppSelector } from "@lib/hooks";
import { RootState } from "@lib/root.reducer";
import { FetchStatusEnum } from "@lib/services/fetch.type";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import logo from "../../assets/images/rab-logo.png";

const ForgetPassword: React.FC = () => {
  const dispatch = useDispatch();

  const forgetPasswordFetchStatus = useAppSelector(
    (state: RootState) => state.forgotPassword.forgotPasswordFetchStatus
  );

  const forgetPasswordError = useAppSelector(
    (state: RootState) => state.forgotPassword.forgotPasswordError
  );

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: forgotPasswordSchema,

    onSubmit: (values) => {
      try {
        dispatch(
          forgotPasswordActions.forgotPassword({
            request: {
              ...values,
            },
          })
        );
      } catch (error) {
        console.log("Error:", error);
      }
    },
  });

  useEffect(() => {
    if (forgetPasswordFetchStatus === FetchStatusEnum.SUCCESS) {
      redirect("/login/change-password");
    } else if (
      forgetPasswordFetchStatus === FetchStatusEnum.ERROR ||
      forgetPasswordError
    ) {
      toast("Failed to submit");
    }
  }, [forgetPasswordFetchStatus, forgetPasswordError]);

  return (
    <div className="login-background d-flex justify-content-center align-items-center">
      <div className="login-container">
        <div className="my-4 text-center">
          <Image src={logo} alt="rab logo" width={100} height={100} />
          <h2 className="fs-1 mt-2 text-white">Forgot Password</h2>
          <p className="fs-5 text-white">Enter your registered email</p>
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
          <button
            type="submit"
            className="btn btn-success w-100 mt-4 border-2"
            disabled={forgetPasswordFetchStatus === FetchStatusEnum.FETCHING}
          >
            {forgetPasswordFetchStatus === FetchStatusEnum.FETCHING
              ? "Sending..."
              : "Send Reset Code"}
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
