const {
  SignUpService,
  LoginService,
} = require("../services/UserServices");

exports.SignUP = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the request body

    const result = await SignUpService(req.body);

    if (result.status === "success") {
      return res.status(201).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.error("❌ Signup error:", error);
    return res.status(500).json({
      status: "fail",
      message: error.message || "Signup failed. Please try again later.",
    });
  }
};


exports.Login = async (req, res) => {
  try {
    // Call the Login service with request data
    const result = await LoginService(req.body);

    if (result.status === "success") {
      // Send success response with the token or any necessary data
      return res.status(200).json(result);
    } else {
      // Send error response if login failed
      return res.status(400).json(result);
    }
  } catch (error) {
    console.error("❌ Login error:", error);

    // Handle unexpected errors
    return res.status(500).json({
      status: "fail",
      message: error.message || "Login failed. Please try again later.",
    });
  }
};

exports.UserLogout = async (req, res) => {
  // Set cookie options
  const cookieOption = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Cookie expires in 24 hours
    httpOnly: true, // Ensures cookie is only accessible via HTTP requests
    secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production (HTTPS)
    sameSite: "Strict", // Prevents sending cookies in cross-origin requests
  };

  // Clear the token cookie
  res.cookie("token", "", cookieOption);

  // Send success response
  return res.status(200).json({
    status: "success",
    message: "Successfully logged out",
  });
};



