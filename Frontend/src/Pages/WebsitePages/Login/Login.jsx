"use client";

import React, { useState } from "react";
import passwordEye from "@/assets/icons/password-eye-icon.svg";
import Breadcrumb from "@/Components/Shared/Breadcrumb/Breadcrumb";

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
            <h2>
              Welcome to
              <br /> ABC Computers
            </h2>

            <form>
              <input type="text" id="username" placeholder="Enter a mail" />

              <label htmlFor="password">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                />
                <a href="#">
                  <img className="hide-icon" src={passwordEye.src} alt="" />
                </a>
              </label>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>

              <button className="sign-in-btn" type="submit">
                SIGN IN
              </button>
            </form>

            <div className="switch">
              Dont have an account?
              <span onClick={() => setLogin(false)}>SIGN UP</span>
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
                  <label htmlFor="lastName">last Name</label>
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
                <input type="checkbox" />
                <label htmlFor="checkbox" className="checkbox">
                  I accept the <a>Privacy Policy.</a>
                </label>
              </div>

              <div className="input-row">
                <button className="sign-up-btn" type="submit">
                  SIGN UP
                </button>
              </div>
            </form>
            <div className="switch">
              Already have an account?
              <span onClick={() => setLogin(true)}>SIGN IN</span>
            </div>
          </div>
        </div>
        {/* <!-- Registration Form End --> */}
      </div>
    </div>
  );
};

export default Login;
