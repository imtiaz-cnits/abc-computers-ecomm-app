const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Retrieve token from headers, cookies, or query params
    let token =
        req.headers["authorization"]?.split(" ")[1] ||  // Bearer Token
        req.cookies["token"] ||                         // Cookie Token
        req.query.token;                                // Query Token (optional)

    if (!token || token.trim() === "") {
      console.error("❌ No token provided in the request.");
      return res.status(401).json({
        status: "fail",
        message: "No token provided, unauthorized.",
      });
    }

    // Decode and verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");

    if (!decoded) {
      console.error("❌ Token is invalid.");
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized, invalid token.",
      });
    }

    // Attach decoded user info to req.user
    req.user = {
      email: decoded.email,
      userId: decoded.userId,
    };

    // Proceed to next middleware or route
    next();
  } catch (error) {
    console.error("❌ Token Verification Error:", error.message);
    console.error(error.stack);  // For debugging

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "fail",
        message: "Token has expired. Please log in again.",
      });
    }

    return res.status(500).json({
      status: "fail",
      message: "Token verification failed. Please try again.",
    });
  }
};
