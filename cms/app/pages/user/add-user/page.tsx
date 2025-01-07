"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import toast, { Toaster } from "react-hot-toast";

const AddUser: React.FC = () => {
  const router = useRouter();

  const [data, setData] = useState({
    nameBn: "",
    nameEn: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [roles, setRoles] = useState([]);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("http://localhost:8000/roles");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setRoles(result);
        console.log(roles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRoles();
  }, []);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (confirmPassword) {
      setPasswordsMatch(newPassword === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    if (password) {
      setPasswordsMatch(password === newConfirmPassword);
    }
  };

  const handleCancel = () => {
    toast.success("Cancelled Successfully!");

    setTimeout(() => {
      router.push("./user-list");
    }, 1000);
  };

  const handleSubmit = async () => {
    const isEmptyField =
      !data.nameBn ||
      !data.nameEn ||
      !data.email ||
      !password ||
      !confirmPassword;

    if (isEmptyField) {
      toast.error("Please fill out all required fields.");
      return;
    }

    if (!passwordsMatch) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          nameBn: data.nameBn,
          nameEn: data.nameEn,
          email: data.email,
          password: password,
          role: data.role,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("User added successfully:", result);

      toast.success("User Added Successfully!");

      setTimeout(() => {
        router.push("./user-list");
      }, 1000);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  return (
    <div className="inner-page-wrapper">
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="page-title-bar">
            <h5 className="page-title">Add New User</h5>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="#">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Add New User
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-7">
          <div className="card">
            <div className="card-body">
              <div className="form-wrapper">
                <label htmlFor="NameBn" className="form-label">
                  Name (Bangla) <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="NameBn"
                  placeholder="Enter Name"
                  value={data.nameBn}
                  onChange={(e) => setData({ ...data, nameBn: e.target.value })}
                />
              </div>
              <div className="form-wrapper">
                <label htmlFor="NameEn" className="form-label">
                  Name (English) <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="NameEn"
                  placeholder="Enter Name"
                  value={data.nameEn}
                  onChange={(e) => setData({ ...data, nameEn: e.target.value })}
                />
              </div>
              <div className="form-wrapper">
                <label htmlFor="Email" className="form-label">
                  Email <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  placeholder="Enter Email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              <div className="form-wrapper position-relative">
                <label htmlFor="Password" className="form-label">
                  Password <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  className="form-control"
                  id="Password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y pe-3 mt-2"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {isPasswordVisible ? <EyeSlash /> : <Eye />}
                </span>
              </div>

              <div className="form-wrapper position-relative">
                <label htmlFor="ConfirmPassword" className="form-label">
                  Confirm Password <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  className={`form-control ${
                    !passwordsMatch ? "is-invalid" : ""
                  }`}
                  id="ConfirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y pe-3 mt-2"
                  onClick={toggleConPasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {isConfirmPasswordVisible ? <EyeSlash /> : <Eye />}
                </span>
                {!passwordsMatch && (
                  <div className="invalid-feedback">
                    Passwords do not match!
                  </div>
                )}
              </div>
              <div className="form-wrapper">
                <label htmlFor="Role" className="form-label">
                  Role
                </label>
                <select
                  className="form-select"
                  id="Role"
                  value={data.role}
                  onChange={(e) => setData({ ...data, role: e.target.value })}
                >
                  <option value="" disabled selected>
                    Select Role
                  </option>
                  {roles.map((item) => (
                    <option key={item.id} value={item.roleName}>
                      {item.roleName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-wrapper text-end mt-4">
                <button
                  type="button"
                  className="btn btn-secondary me-3"
                  id="Cancel"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  id="Create"
                  onClick={handleSubmit}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Text Translator</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
