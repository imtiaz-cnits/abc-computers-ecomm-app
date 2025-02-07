const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const EmailSend = require("../utility/EmailHelper");
const UserModel = require("../models/UserModel");
const { EncodeToken } = require("../utility/TokenHelper");

// Signup Service
const SignUpService = async (data) => {
  try {
    let { name, email, mobile, password, img_url, status, role } = data;

    // ✅ Validate required fields
    if (!name || !email || !mobile || !password) {
      return { status: "fail", message: "All fields are required." };
    }

    email = email.toLowerCase(); // Ensure email is stored in lowercase

    // ✅ Email format validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      return { status: "fail", message: "Invalid email format." };
    }

    // ✅ Password strength validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return {
        status: "fail",
        message: "Password must be at least 8 characters long, contain at least one number and one uppercase letter.",
      };
    }

    // ✅ Check for existing email
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return { status: "fail", message: "Email already exists." };
    }

    // ✅ Check for existing mobile number
    const existingMobile = await UserModel.findOne({ mobile });
    if (existingMobile) {
      return { status: "fail", message: "Mobile number already exists." };
    }

    // ✅ Set default values for optional fields
    img_url = img_url || "default_image_url";
    status = status || "active";
    role = role || "user";

    // ✅ Hash the password securely
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // ✅ Create new user
    const newUser = new UserModel({
      name,
      email,
      mobile,
      password: hashedPassword,
      img_url,
      status,
      role,
    });

    // ✅ Save user to the database
    await newUser.save();

    // ✅ Generate a token
    const token = jwt.sign(
        { userId: newUser._id, email: newUser.email, role: newUser.role },
        process.env.JWT_SECRET || "your_secret_key", // Replace with environment variable
        { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Return success response
    return {
      status: "success",
      message: "User registered successfully.",
      token,
      redirect: "/login",  // Redirect user to login after successful signup
    };
  } catch (error) {
    console.error("❌ Error in SignUpService:", error.message);
    return { status: "fail", message: "Something went wrong during signup." };
  }
};

const LoginService = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({ status: "fail", message: "Email and password are required." });
    }

    email = email.toLowerCase(); // Normalize the email to lowercase for comparison

    // ✅ Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(401).json({ status: "fail", message: "Invalid email or password." });
    }

    // ✅ Compare entered password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password does not match for:", email);
      return res.status(401).json({ status: "fail", message: "Invalid email or password." });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET || "your_secret_key", // Secret key should be environment variable
        { expiresIn: "1h" } // Token expires in 1 hour
    );

    // ✅ Send response with user details and token
    return res.status(200).json({
      status: "success",
      message: "Login successful.",
      user: { name: user.name, email: user.email, mobile: user.mobile, role: user.role },
      token, // Send the JWT token
      redirect: "/dashboard" // Redirect user to dashboard (this is client-side logic)
    });

  } catch (error) {
    console.error("❌ Login Error:", error);
    return res.status(500).json({ status: "fail", message: "Something went wrong during login." });
  }
};



module.exports = {
  SignUpService,
  LoginService
};
