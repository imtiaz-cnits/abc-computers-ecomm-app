"use client";

import React, { useState } from "react";
import passwordEye from "@/assets/icons/password-eye-icon.svg";
import Breadcrumb from "@/Components/Shared/Breadcrumb/Breadcrumb";
import Link from "next/link";

const Login = () => {
  const [login, setLogin] = useState(true);

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
            <form className="login-form">
              <div className="input-row">
                <div className="input-field">
                  <label htmlFor="loginEmail">Email</label>
                  <input
                    type="email"
                    id="loginEmail"
                    placeholder="Enter a email"
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-field">
                  <label htmlFor="loginPassword">Password</label>
                  <input
                    type="password"
                    id="loginPassword"
                    placeholder="Enter password"
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
            <form className="register-form">
              <div className="input-row">
                <div className="input-field">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" id="firstName" placeholder="First Name" />
                </div>

                <div className="input-field">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" placeholder="Last Name" />
                </div>
              </div>

              <div className="input-row">
                <div className="input-field">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="Enter a email" />
                </div>
              </div>

              <div className="input-row">
                <div className="input-field">
                  <label htmlFor="number">Phone Number</label>
                  <input type="number" id="number" placeholder="Phone number" />
                </div>
              </div>

              <div className="input-row">
                <div className="input-field">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div className="input-row">
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox" className="checkbox">
                  I accept the{" "}
                  <Link href={"#"} className="policy">
                    Privacy Policy.
                  </Link>
                </label>
              </div>

              <div className="input-row">
                <button className="sign-up-btn" type="submit">
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
