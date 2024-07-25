import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

import { jwtDecode } from "jwt-decode";

import authManImage from "../../assets/images/auth-page-man.png";

import "./Login.css";

const Login = ({ user, handleCallbackResponse, handleSignOut }) => {
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");

  const navigate = useNavigate();

  // GLOBAL GOOGLE AUTH
  useEffect(() => {
    // eslint-disable-next-line no-undef
    google.accounts.id.initialize({
      client_id:
        "14533103941-0nug3n80jq4jkkgdd3cs3jjqi8fvnnvf.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    // eslint-disable-next-line no-undef
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    // eslint-disable-next-line no-undef
    google.accounts.id.prompt();
  }, [handleCallbackResponse]);
  // GLOBAL GOOGLE AUTH

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/signin",
        data
      );
      console.log(data);
      const { token } = response.data;
      localStorage.setItem("token", token);
      setLoginSuccess("Login successful! Redirecting to home page...");
      setTimeout(() => {
        navigate("/");
      }, 5000);
      window.location.reload();
      toast("Successfully signed in!", {
        icon: "👏",
      });
    } catch (error) {
      console.error("Login failed:", error.response.data.message);
      setLoginError(
        "Wrong email or password! Make sure you have signed up first!"
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Horizon Harbour - Login</title>
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
          {/* Right side with login form */}
          <div className="col-md-6 d-flex align-items-center justify-content-center custom-bg-login">
            <div className="login-form-container">
              <h2 className="text-center mb-4 fw-bold">
                Welcome Back! Good to see you!
              </h2>
              {loginError && !loginSuccess && (
                <p className="text-danger fw-bolder text-center">
                  {loginError}
                </p>
              )}
              {loginSuccess && (
                <p className="text-success fw-bolder text-center">
                  {loginSuccess}
                </p>
              )}
              {/* GOOGLE LOGIN */}
              <div className="d-flex justify-content-center align-items-center mb-4">
                <div id="signInDiv"></div>
              </div>
              {/* GOOGLE LOGIN */}
              <p className="stripe-line text-center mb-4 mt-4">
                Or login with Email & Password
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control p-3"
                    id="email"
                    placeholder="Enter email address"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control p-3"
                    placeholder="Enter password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                </div>
                <div className="mb-4 form-check d-flex justify-content-between">
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="custom-bg-login-btn w-100 p-3 border-0 text-white fw-bold"
                >
                  Login
                </button>
              </form>
              <p className="text-center mt-3">
                Don't have an account?
                <Link to="/signup" className="text-decoration-none ms-2">
                  Signup
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
