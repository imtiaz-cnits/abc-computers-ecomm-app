"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "@/Components/Shared/Breadcrumb/Breadcrumb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const router = useRouter(); // Initialize router

  // Handle Signup Form Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Signup Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:5070/api/v1/SignUP",
        formData
      );

      const result = await response?.data;

      console.log(result);

      if (result?.status === "success" && result?.token) {
        // ✅ Ensure success & token exists
        toast.success("🎉 Hurray! User Registration Successful.");

        // ✅ Store token securely in localStorage
        localStorage.setItem("token", result?.token);
        // router.push("/login");  // Redirect to login page after successful signup

        e.target.reset();
        setFormData({
          name: "",
          email: "",
          mobile: "",
          password: "",
        });
      }
    } catch (error) {
      console.error("❌ Signup Error:", error);
      toast.error(
        error?.response?.data?.message || "❌ Signup failed! Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Login Form Change
  const handleLoginChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  // Handle Login Form Submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(loginFormData);

    try {
      const response = await axios.post(
        "http://localhost:5070/api/v1/Login",
        loginFormData
      );

      const result = await response?.data;

      console.log(result?.status);

      if (result?.status !== "success") {
        throw new Error(result.message || "Invalid email or password.");
      }

      // ✅ If login is successful
      if (result?.status === "success" && result?.token) {
        localStorage.setItem("token", result?.token);
        toast.success("Login successful!");
        // router.push("/"); // Redirect to dashboard
      }
    } catch (error) {
      console.error("❌ Login Error:", error);
      toast.error(
        error?.response?.data?.message ||
          "Login failed! Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-in-signup">
      <Breadcrumb pageTitle={"Register"} />

      <div className="container sign-in-signup-container">
        {/* <!-- Sign in Form Start --> */}
        <div
          className="login"
          style={{ display: `${login ? "block" : "none"}` }}
        >
          <div>
            <h2>Account Login</h2>
            <form className="login-form" onSubmit={handleLoginSubmit}>
              <div className="input-row">
                <div className="input-field">
                  <label htmlFor="loginEmail">Email</label>
                  <input
                    type="email"
                    id="loginEmail"
                    name="email"
                    placeholder="Enter a email"
                    onChange={handleLoginChange}
                    required
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-field">
                  <label htmlFor="loginPassword">Password</label>
                  <input
                    type="password"
                    id="loginPassword"
                    name="password"
                    placeholder="Enter password"
                    onChange={handleLoginChange}
                    required
                  />
                </div>
              </div>

              <div className="input-row">
                <button className="sign-in-btn" type="submit">
                  SIGN IN
                </button>
              </div>
            </form>
            <div className="switch">
              <div>
                <span>Don't have an account?</span>
                <span className="switch-btn" onClick={() => setLogin(false)}>
                  Register Now
                </span>
              </div>
              <span className="forgot">Forgot Password?</span>
            </div>
          </div>
        </div>
        {/* <!-- Sign in Form End --> */}

        {/* <!-- Registration Form Start --> */}
        <div
          className="register"
          style={{ display: `${login ? "none" : "block"}` }}
        >
          <div>
            <h2>Register Account</h2>
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="input-row">
                <div className="input-field">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter a email"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-field">
                  <label htmlFor="number">Phone Number</label>
                  <input
                    type="number"
                    id="number"
                    name="mobile"
                    placeholder="Phone number"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-field">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="input-row">
                <input
                  type="checkbox"
                  id="checkbox"
                  onChange={() => setAcceptedTerms(!acceptedTerms)}
                />
                <label htmlFor="checkbox" className="checkbox">
                  I accept the{" "}
                  <Link href={"#"} className="policy">
                    Privacy Policy.
                  </Link>
                </label>
              </div>

              <div className="input-row">
                <button
                  className="sign-up-btn"
                  type="submit"
                  disabled={!acceptedTerms}
                >
                  SIGN UP
                </button>
              </div>
            </form>
            <div className="switch">
              <span>Already have an account?</span>
              <span className="switch-btn" onClick={() => setLogin(true)}>
                Login Now
              </span>
            </div>
          </div>
        </div>
        {/* <!-- Registration Form End --> */}
      </div>
    </div>
  );
};

export default Login;
