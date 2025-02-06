"use client";

import React, { useState } from "react";
import signInCardImg from "@/assets/img/sign-in-card-img.png";
import passwordEye from "@/assets/icons/password-eye-icon.svg";
import signInBg from "@/assets/img/Sign-In-bg.png";

const AuthLogin = () => {
  const [login, setLogin] = useState(true);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5070/api/v1/SignUP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    console.log(formData);

    const result = await response.json();
    console.log(result.message);
    alert(result.message);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // TODO: use right way
    const response = await fetch("http://localhost:5070/api/v1/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginFormData),
    });

    console.log(loginFormData);

    const result = await response.json();
    console.log(result.message);
    alert(result.message);
  };

  return (
    <div className="sign-in-signup">
      <div
        className="container"
        style={{
          background: `url(${signInBg?.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <!-- Sign in Form Start --> */}
        <div
          className="card"
          style={{ display: `${login ? "block" : "none"}` }}
        >
          <div className="card-wrapper">
            <div className="card-image">
              <img src={signInCardImg?.src} alt="" />
            </div>

            <div className="card-item">
              <div className="brand-logo">
                {/* <!-- <img src="./assets/icons/login-page-logo.svg" alt="" /> --> */}
              </div>
              <h2>
                Welcome to
                <br /> ABC Computers
              </h2>

              <form onSubmit={handleLoginSubmit}>
                <input
                  type="email"
                  id="username"
                  name="email"
                  onChange={handleLoginChange}
                  placeholder="Enter a mail"
                />

                <label htmlFor="loginPassword">
                  <input
                    type="password"
                    id="loginPassword"
                    name="password"
                    placeholder="Enter password"
                    onChange={handleLoginChange}
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
        </div>
        {/* <!-- Sign in Form End --> */}

        {/* <!-- Registration Form Start --> */}
        <div
          className="card"
          style={{ display: `${login ? "none" : "block"}` }}
        >
          <div className="card-wrapper">
            <div className="card-image">
              <img src={signInCardImg?.src} alt="" />
            </div>

            <div className="card-item">
              <h2>Create an account</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="fullname"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                />

                <input
                  type="email"
                  id="email"
                  placeholder="Enter a email"
                  name="email"
                  onChange={handleChange}
                />

                <input
                  type="number"
                  id="number"
                  placeholder="Phone number"
                  name="mobile"
                  onChange={handleChange}
                />

                <label htmlFor="signUpPassword">
                  <input
                    type="password"
                    id="signUpPassword"
                    placeholder="Enter password"
                    name="password"
                    onChange={handleChange}
                  />
                  <a href="#">
                    <img className="hide-icon" src={passwordEye?.src} alt="" />
                  </a>
                </label>

                {/* <label htmlFor="cheakbox" className="cheakbox">
                  <input type="checkbox" />
                  <h1>
                    I accept the <a href="#">Privacy Policy.</a>
                  </h1>
                </label> */}

                <button className="sign-up-btn" type="submit">
                  SIGN UP
                </button>
              </form>
              <div className="switch">
                Already have an account?
                <span onClick={() => setLogin(true)}>SIGN IN</span>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Registration Form End --> */}
      </div>
    </div>
  );
};

export default AuthLogin;
