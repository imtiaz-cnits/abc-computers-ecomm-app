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
    const result = await LoginService(req);

    if (result.status !== "success") {
      return res.status(401).json(result); // Return 401 Unauthorized if login fails
    }

    // ✅ Return the token and user data
    return res.status(200).json({
      status: "success",
      message: "Login successful.",
      user: result.user,
      token: result.token
    });

  } catch (error) {
    console.error("❌ Login error:", error);
    return res.status(500).json({ status: "fail", message: "Login failed. Please try again later." });
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



