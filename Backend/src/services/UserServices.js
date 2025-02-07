const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EmailSend = require("../utility/EmailHelper");
const UserModel = require("../models/UserModel");
const ProfileModel = require("../models/ProfileModel");
const { EncodeToken } = require("../utility/TokenHelper");

// Signup Service
const SignUpService = async (req, res) => {
  try {
    let { name, email, mobile, password, img_url, status, role } = req.body;

    // ✅ Validate required fields
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ status: "fail", message: "All fields are required." });
    }

    email = email.toLowerCase(); // Ensure email is stored in lowercase

    // ✅ Email format validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ status: "fail", message: "Invalid email format." });
    }

    // ✅ Password strength validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        status: "fail",
        message: "Password must be at least 8 characters long, contain at least one number and one uppercase letter.",
      });
    }

    // ✅ Check for existing email
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ status: "fail", message: "Email already exists." });
    }

    // ✅ Check for existing mobile number
    const existingMobile = await UserModel.findOne({ mobile });
    if (existingMobile) {
      return res.status(409).json({ status: "fail", message: "Mobile number already exists." });
    }

    // ✅ Set default values for optional fields
    img_url = img_url || "default_image_url";
    status = status || "active";
    role = role || "user";

    // ✅ Hash the password securely
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log("✅ New Hashed Password:", hashedPassword);

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

      return res.status(201).json({ status: "success", message: "User registered successfully." });
    } catch (hashError) {
      console.error("❌ Error hashing password:", hashError.message);
      return res.status(500).json({ status: "fail", message: "Error processing password." });
    }
  } catch (e) {
    console.error("❌ Error in SignUpService:", e.message);
    return res.status(500).json({ status: "fail", message: "Something went wrong during signup." });
  }
};


// Login Service
const LoginService = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({ status: "fail", message: "Email and password are required." });
    }

    email = email.toLowerCase();
    const user = await UserModel.findOne({ email });

    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(401).json({ status: "fail", message: "Invalid email or password." });
    }

    console.log("🔹 Entered Password:", password);
    console.log("🔹 Stored Hashed Password:", user.password);

    // Compare entered password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("✅ Password Match Result:", isMatch);

    if (!isMatch) {
      console.log("❌ Password does not match for:", email);
      return res.status(401).json({ status: "fail", message: "Invalid email or password." });
    }

    // Generate a JWT token (if required)
    const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET || "your_secret_key",
        { expiresIn: "1h" } // Token expires in 1 hour
    );

    console.log("✅ Login Successful. Redirecting to Dashboard...");

    // Send response with user details and token
    return res.status(200).json({
      status: "success",
      message: "Login successful.",
      user: { name: user.name, email: user.email, mobile: user.mobile, role: user.role },
      token, // Send the JWT token
      redirect: "/dashboard" // Redirect user to dashboard
    });

  } catch (error) {
    console.error("❌ Login Error:", error);
    return res.status(500).json({ status: "fail", message: "Something went wrong during login." });
  }
};






// OTP Service
const UserOTPService = async (req) => {
  try {
    let email = req.params.email;
    let code = Math.floor(100000 + Math.random() * 900000);

    let EmailText = `Your Verification Code is ${code}`;
    let EmailSubject = "Email Verification";

    // Send OTP via email
    await EmailSend(email, EmailText, EmailSubject);
    await UserModel.updateOne(
        { email: email },
        { $set: { otp: code } },
        { upsert: true }
    );

    return { status: "Success", message: "Your OTP code has been sent." };
  } catch (e) {
    console.error("Error sending OTP:", e);
    return { status: "fail", message: "Something went wrong" };
  }
};

// OTP Verification Service
const VerifyOTPService = async (req) => {
  try {
    const email = req.params.email.toLowerCase(); // Consistent casing
    const otp = req.params.otp;

    // Find user by email and OTP
    const user = await UserModel.findOne({ email: email, otp: otp });

    if (user) {
      // Encode token with user id
      const token = EncodeToken(email, user._id.toString());

      // Reset OTP to prevent reuse
      await UserModel.updateOne({ email: email }, { $set: { otp: "0" } });

      return {
        status: "success",
        message: "Valid OTP",
        token: token,
      };
    } else {
      return {
        status: "fail",
        message: "Invalid OTP",
      };
    }
  } catch (e) {
    console.error("Error in OTP verification:", e); // Log the error
    return {
      status: "fail",
      message: "An error occurred during OTP verification",
    };
  }
};

// Profile Services
const SaveProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.user_id = user_id;

    // Upsert Profile Information
    await ProfileModel.updateOne(
        { userID: user_id },
        { $set: reqBody },
        { upsert: true }
    );
    return { status: "Success", message: "Profile Save Successfully" };
  } catch (e) {
    console.error("Error in SaveProfileService:", e);
    return { status: "fail", message: "Something went wrong.." };
  }
};

const ReadProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let result = await ProfileModel.find({ userID: user_id });
    return { status: "Success", data: result };
  } catch (e) {
    console.error("Error in ReadProfileService:", e);
    return { status: "fail", message: "Something went wrong.." };
  }
};

module.exports = {
  SignUpService,
  LoginService,
  UserOTPService,
  VerifyOTPService,
  SaveProfileService,
  ReadProfileService,
};
