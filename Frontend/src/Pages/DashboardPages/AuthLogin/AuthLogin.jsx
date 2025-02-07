"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router
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

  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter(); // Initialize router

  // Handle Signup Form Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Signup Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5070/api/v1/SignUP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      alert(result.message);

      if (result.status === "Success") {
        setLogin(true); // Switch to login after successful signup
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Signup failed! Please try again.");
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

    try {
      const response = await fetch("http://localhost:5070/api/v1/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginFormData),
      });

      // Parse the response
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Invalid email or password.");
      }

      alert(result.message);

      if (result.status === "success") {
        localStorage.setItem("token", result.token); // Save token for authentication
        window.location.href = result.redirect; // Redirect to dashboard
      }
    } catch (error) {
      console.error("❌ Login Error:", error);
      alert(error.message || "Login failed! Please check your credentials.");
    } finally {
      setLoading(false);
    }
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
          {/* Sign-in Form */}
          <div className="card" style={{ display: login ? "block" : "none" }}>
            <div className="card-wrapper">
              <div className="card-image">
                <img src={signInCardImg?.src} alt="" />
              </div>

              <div className="card-item">
                <h2>Welcome to ABC Computers</h2>

                <form onSubmit={handleLoginSubmit}>
                  <input
                      type="email"
                      id="username"
                      name="email"
                      onChange={handleLoginChange}
                      placeholder="Enter a mail"
                      required
                  />

                  <label htmlFor="loginPassword">
                    <input
                        type="password"
                        id="loginPassword"
                        name="password"
                        placeholder="Enter password"
                        onChange={handleLoginChange}
                        required
                    />
                    <a href="#">
                      <img className="hide-icon" src={passwordEye.src} alt="" />
                    </a>
                  </label>

                  <a href="#" className="forgot-password">Forgot Password?</a>

                  <button className="sign-in-btn" type="submit" disabled={loading}>
                    {loading ? "Signing In..." : "SIGN IN"}
                  </button>
                </form>

                <div className="switch">
                  Don’t have an account? <span onClick={() => setLogin(false)}>SIGN UP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Signup Form */}
          <div className="card" style={{ display: login ? "none" : "block" }}>
            <div className="card-wrapper">
              <div className="card-image">
                <img src={signInCardImg?.src} alt="" />
              </div>

              <div className="card-item">
                <h2>Create an account</h2>
                <form onSubmit={handleSubmit}>
                  <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                  <input type="email" name="email" placeholder="Enter email" onChange={handleChange} required />
                  <input type="number" name="mobile" placeholder="Phone number" onChange={handleChange} required />

                  <label htmlFor="signUpPassword">
                    <input
                        type="password"
                        id="signUpPassword"
                        name="password"
                        placeholder="Enter password"
                        onChange={handleChange}
                        required
                    />
                    <a href="#">
                      <img className="hide-icon" src={passwordEye?.src} alt="" />
                    </a>
                  </label>

                  <button className="sign-up-btn" type="submit" disabled={loading}>
                    {loading ? "Signing Up..." : "SIGN UP"}
                  </button>
                </form>
                <div className="switch">
                  Already have an account? <span onClick={() => setLogin(true)}>SIGN IN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AuthLogin;


















// "use client";
//
// import React, { useState } from "react";
// import { useRouter } from "next/navigation"; // Import Next.js router
// import signInCardImg from "@/assets/img/sign-in-card-img.png";
// import passwordEye from "@/assets/icons/password-eye-icon.svg";
// import signInBg from "@/assets/img/Sign-In-bg.png";
//
// const AuthLogin = () => {
//   const [login, setLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     password: "",
//   });
//
//   const [loginFormData, setLoginFormData] = useState({
//     email: "",
//     password: "",
//   });
//
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//
//     const response = await fetch("http://localhost:5070/api/v1/SignUP", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });
//
//     console.log(formData);
//
//     const result = await response.json();
//     console.log(result.message);
//     alert(result.message);
//   };
//
//   // Sign In Submission Stage (Custom by Imtiaz)
//   const handleLoginChange = (e) => {
//     setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
//   };
//
//   const router = useRouter(); // Initialize router
//
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//
//     const response = await fetch("http://localhost:5070/api/v1/Login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(loginFormData),
//     });
//
//     const result = await response.json();
//     alert(result.message);
//
//     if (result.status === "Success") {
//       router.push("/dashboard"); // Redirect to dashboard
//     }
//   };
//
//
//   return (
//     <div className="sign-in-signup">
//       <div
//         className="container"
//         style={{
//           background: `url(${signInBg?.src})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         {/* <!-- Sign in Form Start --> */}
//         <div
//           className="card"
//           style={{ display: `${login ? "block" : "none"}` }}
//         >
//           <div className="card-wrapper">
//             <div className="card-image">
//               <img src={signInCardImg?.src} alt="" />
//             </div>
//
//             <div className="card-item">
//               <div className="brand-logo">
//                 {/* <!-- <img src="./assets/icons/login-page-logo.svg" alt="" /> --> */}
//               </div>
//               <h2>
//                 Welcome to
//                 <br /> ABC Computers
//               </h2>
//
//               <form onSubmit={handleLoginSubmit}>
//                 <input
//                   type="email"
//                   id="username"
//                   name="email"
//                   onChange={handleLoginChange}
//                   placeholder="Enter a mail"
//                 />
//
//                 <label htmlFor="loginPassword">
//                   <input
//                     type="password"
//                     id="loginPassword"
//                     name="password"
//                     placeholder="Enter password"
//                     onChange={handleLoginChange}
//                   />
//                   <a href="#">
//                     <img className="hide-icon" src={passwordEye.src} alt="" />
//                   </a>
//                 </label>
//                 <a href="#" className="forgot-password">
//                   Forgot Password?
//                 </a>
//
//                 <button className="sign-in-btn" type="submit">
//                   SIGN IN
//                 </button>
//               </form>
//
//               <div className="switch">
//                 Dont have an account?
//                 <span onClick={() => setLogin(false)}>SIGN UP</span>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* <!-- Sign in Form End --> */}
//
//         {/* <!-- Registration Form Start --> */}
//         <div
//           className="card"
//           style={{ display: `${login ? "none" : "block"}` }}
//         >
//           <div className="card-wrapper">
//             <div className="card-image">
//               <img src={signInCardImg?.src} alt="" />
//             </div>
//
//             <div className="card-item">
//               <h2>Create an account</h2>
//               <form onSubmit={handleSubmit}>
//                 <input
//                   type="text"
//                   id="fullname"
//                   placeholder="Name"
//                   name="name"
//                   onChange={handleChange}
//                 />
//
//                 <input
//                   type="email"
//                   id="email"
//                   placeholder="Enter a email"
//                   name="email"
//                   onChange={handleChange}
//                 />
//
//                 <input
//                   type="number"
//                   id="number"
//                   placeholder="Phone number"
//                   name="mobile"
//                   onChange={handleChange}
//                 />
//
//                 <label htmlFor="signUpPassword">
//                   <input
//                     type="password"
//                     id="signUpPassword"
//                     placeholder="Enter password"
//                     name="password"
//                     onChange={handleChange}
//                   />
//                   <a href="#">
//                     <img className="hide-icon" src={passwordEye?.src} alt="" />
//                   </a>
//                 </label>
//
//                 {/* <label htmlFor="cheakbox" className="cheakbox">
//                   <input type="checkbox" />
//                   <h1>
//                     I accept the <a href="#">Privacy Policy.</a>
//                   </h1>
//                 </label> */}
//
//                 <button className="sign-up-btn" type="submit">
//                   SIGN UP
//                 </button>
//               </form>
//               <div className="switch">
//                 Already have an account?
//                 <span onClick={() => setLogin(true)}>SIGN IN</span>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* <!-- Registration Form End --> */}
//       </div>
//     </div>
//   );
// };
//
// export default AuthLogin;
