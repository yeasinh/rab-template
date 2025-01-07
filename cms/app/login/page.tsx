"use client";

import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import React, { FC, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { FetchStatusEnum } from "@lib/services/fetch.type";
import Image from "next/image";
import { RootState } from "@lib/root.reducer";
import { loginActions } from "@lib/slices/auth/login/login.slice";
import logo from "../assets/images/rab-logo.png";
import { redirect, useRouter } from "next/navigation";
import { loginSchema } from "@lib/schema/schema-login";
import { useFormik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { removeToken } from "@lib/utils/action";
import { UserStatus } from "@lib/services/user/user.service.type";

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const userType = useSelector(
    (state: RootState) => state.login.loginResponse?.login.userType
  );

  const adminMenus = useSelector(
    (state: RootState) => state.login.loginResponse?.login.menus
  );

  const loginFetchStatus = useAppSelector(
    (state: RootState) => state.login.loginFetchStatus
  );

  const loginError = useAppSelector(
    (state: RootState) => state.login.loginError
  );

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Use Formik hook
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },

    validationSchema: loginSchema,

    onSubmit: async (values) => {
      // Handle form submission (e.g., API call)
      //await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        login(values.email, values.password);
      } catch (e) {}
    },
  });

  // Deconstruct Formik object
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  const login = (email: string, password: string) => {
    const loginAction = loginActions.login({
      request: {
        username: email,
        password: password,
      },
    });
    dispatch(loginAction);
  };

  // useEffect(()=>{
  //   // Login FAILURE action
  //   if(loginFetchStatus === FetchStatusEnum.FAILURE) {
  //     if(loginError)toast(`${loginError}`);
  //   }
  //     // Login Success action
  //   if(loginFetchStatus === FetchStatusEnum.SUCCESS){
  //     //console.log('call redirect')
  //     return redirect('/pages/dashboard');
  //   }
  // },[loginFetchStatus])

  // useEffect(()=>{
  //   // Login FAILURE action
  //   if(loginFetchStatus === FetchStatusEnum.FAILURE) {
  //     if(loginError)toast(`${loginError}`);
  //   }
  //     //Login Success action
  //   if(loginFetchStatus === FetchStatusEnum.SUCCESS){
  //     //console.log('call redirect')
  //     return redirect('/pages/dashboard');
  //   }
  // },[loginFetchStatus !== FetchStatusEnum.FETCHING &&  loginFetchStatus !== FetchStatusEnum.IDLE])

  // useEffect(()=>{
  //   // Login FAILURE action
  //   if(loginFetchStatus === FetchStatusEnum.FAILURE) {
  //     if(loginError)toast(`${loginError}`);
  //   }
  //     // Login Success action
  //   if(loginFetchStatus === FetchStatusEnum.SUCCESS){
  //     //console.log('call redirect')
  //     return redirect('/pages/dashboard');
  //   }
  // },[loginFetchStatus])

  useEffect(() => {
    if (loginFetchStatus === FetchStatusEnum.SUCCESS) {
      if (userType !== UserStatus.ADMIN && adminMenus && adminMenus.length) {
        redirect(`${adminMenus[0]?.url}`);
      }

      if (userType !== UserStatus.ADMIN && adminMenus && !adminMenus.length) {
        alert("The user does not have any access to any page");
        removeToken();
        dispatch(loginActions.resetLogin());
        redirect("/login");
      }

      redirect("/pages/dashboard");
    } else if (loginFetchStatus === FetchStatusEnum.FAILURE || loginError) {
      toast(`${loginError}`);
    }
  }, [loginFetchStatus, loginError, adminMenus]);

  return (
    <div className="login-background d-flex justify-content-center align-items-center">
      <div className="login-container">
        <div className="my-4 text-center">
          <Image src={logo} alt="rab logo" width={100} height={100} />
          <h2 className="fs-1 mt-2 text-white">Sign In</h2>
          <p className="fs-5 text-white">Welcome</p>
        </div>
        <form className="px-4" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="text-white">Email</label>
            <input
              name="email"
              type="email"
              className="form-control input-container"
              placeholder="user@email.com"
              value={values.email}
              onChange={handleChange}
              onBlur={formik.handleBlur}
            />
            {touched.email && errors.email && (
              <div className="text-red">{errors.email}</div>
            )}
          </div>

          <div className="form-group" style={{ position: "relative" }}>
            <label className="text-white">Password</label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="form-control input-container"
              placeholder="********"
              value={values.password}
              onChange={handleChange}
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
            {touched.password && errors.password && (
              <div className="text-red">{errors.password}</div>
            )}
          </div>

          <div className="d-flex justify-content-between">
            {/* <div>
              <input type="checkbox" />
              <button style={{ color: "#D9D9D9" }} className="btn">
                Remember Me
              </button>
            </div> */}
            <button
              style={{ color: "#28A745" }}
              className="btn"
              onClick={() => router.push("/login/forgot-password")}
            >
              Forgot Password
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 mt-4 border-2"
            disabled={loginFetchStatus === FetchStatusEnum.FETCHING}
          >
            {loginFetchStatus === FetchStatusEnum.FETCHING
              ? "Logging in..."
              : "Login"}
          </button>
          <ToastContainer />

          {/* <div id="selector" className="container">
            <select className="form-control input">
              <option>English</option>
              <option>Bangla</option>
            </select>
            <i className="fa fa-chevron-down"></i>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
