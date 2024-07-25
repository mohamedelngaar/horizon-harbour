import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

import authManImage from "../../assets/images/auth-page-man.png";

import "./Signup.css";

const Signup = () => {
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState([]);
  const [phone, setPhone] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "jobSeeker",
    },
  });

  // const onSubmit = async (data) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/auth/signup",
  //       data
  //     );
  //     setSignupSuccess("Signup successful! Redirecting to login page...");
  //     setTimeout(() => {
  //       navigate("/login");
  //     }, 3000);
  //   } catch (error) {
  //     console.error("Signup failed:", error.response.data.message);
  //     setSignupError(error.response.data.message);
  //   }
  // };

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    // formData.append("role", role);
    formData.append("profilePic", profilePic);

    try {
      const response = await axios.post(
        "http://localhost:8000/users",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Signup successful! Redirecting to login page...");
      setSignupSuccess("Signup successful! Redirecting to login page...");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setSignupError(error.response.data.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Horizon Harbour - Signup</title>
      </Helmet>
      <div className="container min-vh-100">
        <div className="row min-vh-100">
          {/* Left side with random man image */}
          <div className="col-md-6 p-0 d-flex justify-content-center align-items-center d-none d-md-flex position-relative">
            <img
              src={authManImage}
              alt="Random Man"
              className="img-fluid position-absolute bottom-0 w-50"
            />
          </div>
          {/* Right side with Signup form */}
          <div className="col-md-6 d-flex align-items-center justify-content-center custom-bg-signup">
            <div className="signup-form-container">
              <h2 className="text-center mb-4 fw-bold">
                Join us & get more opportunities!
              </h2>
              {signupError && (
                <p className="text-danger fw-bolder text-center">
                  {signupError}
                </p>
              )}
              {signupSuccess && (
                <p className="text-success fw-bolder text-center">
                  {signupSuccess}
                </p>
              )}
              <form onSubmit={onSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="form-label">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    className="form-control p-3"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your full name"
                    // {...register("name", {
                    //   required: "Name is required",
                    //   minLength: {
                    //     value: 2,
                    //     message: "Name must be at least 2 characters long",
                    //   },
                    //   maxLength: {
                    //     value: 20,
                    //     message: "Name must not exceed 20 characters",
                    //   },
                    // })}
                  />
                  {/* {errors.name && (
                    <p className="text-danger mt-2">{errors.name.message}</p>
                  )} */}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    className="form-control p-3"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter email address"
                    // {...register("email", {
                    //   required: "Email is required",
                    //   pattern: {
                    //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    //     message: "Invalid email address",
                    //   },
                    //   maxLength: {
                    //     value: 50,
                    //     message: "Email must not exceed 50 characters",
                    //   },
                    //   minLength: {
                    //     value: 6,
                    //     message: "Email must be at least 6 characters long",
                    //   },
                    // })}
                  />
                  {/* {errors.email && (
                    <p className="text-danger mt-2">{errors.email.message}</p>
                  )} */}
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control  p-3"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                    // {...register("password", {
                    //   required: "Password is required",
                    //   minLength: {
                    //     value: 6,
                    //     message: "Password must be at least 6 characters long",
                    //   },
                    //   maxLength: {
                    //     value: 20,
                    //     message: "Password must not exceed 20 characters",
                    //   },
                    // })}
                  />
                  {/* {errors.password && (
                    <p className="text-danger mt-2">
                      {errors.password.message}
                    </p>
                  )} */}
                </div>
                <div className="mb-4">
                  <label htmlFor="role" className="form-label">
                    Role:
                  </label>
                  <p className="role-note">
                    NOTE: Role Field is NOT required! However, if you leave it
                    untouched as it is written below, role will be set
                    automatically to{" "}
                    <span className="fw-bolder">jobSeeker</span>! <br /> Feel
                    free to change it to{" "}
                    <span className="fw-bolder">employer</span> if needed!
                  </p>
                  <select
                    className="form-select p-3"
                    id="role"
                    // value={role}
                    // onChange={(event) => setRole(event.target.value)}
                    // {...register("role", {
                    //   pattern: {
                    //     value: /^(jobSeeker|employer)$/i,
                    //     message: "Role must be jobSeeker or employer",
                    //   },
                    // })}
                  >
                    <option value="jobSeeker">jobSeeker</option>
                    <option value="employer">employer</option>
                  </select>
                  {/* {errors.role && (
                    <p className="text-danger mt-2">{errors.role.message}</p>
                  )} */}
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="form-label">
                    Phone Number:
                  </label>
                  <input
                    type="tel"
                    className="form-control p-3"
                    id="phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Enter your phone number"
                    // {...register("phone", {
                    //   required: "Phone is required",
                    //   minLength: {
                    //     value: 6,
                    //     message: "Phone must be at least 6 characters long",
                    //   },
                    //   maxLength: {
                    //     value: 20,
                    //     message: "Phone must not exceed 20 characters",
                    //   },
                    // })}
                  />
                  {/* {errors.phone && (
                    <p className="text-danger mt-2">{errors.phone.message}</p>
                  )} */}
                </div>
                <div className="mb-4">
                  <label htmlFor="profilePic" className="form-label">
                    Profile Picture:
                  </label>
                  <input
                    type="file"
                    className="form-control p-3"
                    id="profilePic"
                    onChange={(event) => setProfilePic(event.target.files[0])}
                    // placeholder="Enter your phone number"
                    // {...register("phone", {
                    //   required: "Phone is required",
                    //   minLength: {
                    //     value: 6,
                    //     message: "Phone must be at least 6 characters long",
                    //   },
                    //   maxLength: {
                    //     value: 20,
                    //     message: "Phone must not exceed 20 characters",
                    //   },
                    // })}
                  />
                  {/* {errors.phone && (
                    <p className="text-danger mt-2">{errors.phone.message}</p>
                  )} */}
                </div>

                <button
                  type="submit"
                  className="custom-bg-signup-btn w-100 p-3 border-0 text-white fw-bold"
                >
                  Signup
                </button>
              </form>
              <p className="text-center mt-3">
                Already have an account?
                <Link to="/login" className="text-decoration-none ms-2">
                  Login
                </Link>
              </p>
              <p className="mt-4">
                By clicking 'Signup', you acknowledge that you have read and
                accept the
                <Link to="/terms" className="text-decoration-none ms-2">
                  Terms of Service
                </Link>{" "}
                and
                <Link to="/privacy" className="text-decoration-none ms-2">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
