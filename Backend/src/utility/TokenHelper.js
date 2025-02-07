const jwt = require("jsonwebtoken");

const KEY = process.env.JWT_SECRET || "123-ABC-XYZ";  // Using environment variable

// Encode Token
exports.EncodeToken = (email, user_id) => {
  let EXPIRE = { expiresIn: "24h" };
  let PAYLOAD = { email: email, user_id: user_id };
  return jwt.sign(PAYLOAD, KEY, EXPIRE);
};

// Decode Token
exports.DecodeToken = (token) => {
  try {
    return jwt.verify(token, KEY);  // Verify and decode the token
  } catch (e) {
    console.error("❌ Token decode error:", e.message);  // Log the error
    return { status: "fail", message: "Token verification failed" };  // Return detailed error
  }
};
