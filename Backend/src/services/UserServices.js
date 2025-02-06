const bcrypt = require("bcryptjs");
const EmailSend = require("../utility/EmailHelper");
const UserModel = require("../models/UserModel");
const ProfileModel = require("../models/ProfileModel");
const { EncodeToken } = require("../utility/TokenHelper");

// Signup Service
const SignUpService = async (req, res = null) => {
  try {
    let { name, email, mobile, password, img_url, status, role } = req.body;

    // Validate required fields
    if (!name || !email || !mobile || !password) {
      const message = "All fields are required";
      return res ? res.status(400).json({ status: "fail", message }) : { status: "fail", message };
    }

    // Email format validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      const message = "Invalid email format";
      return res ? res.status(400).json({ status: "fail", message }) : { status: "fail", message };
    }

    // Password strength validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      const message = "Password must be at least 8 characters long, contain at least one number and one uppercase letter";
      return res ? res.status(400).json({ status: "fail", message }) : { status: "fail", message };
    }

    // Check for existing email
    let existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      const message = "Email already exists";
      return res ? res.status(409).json({ status: "fail", message }) : { status: "fail", message };
    }

    // Check for existing mobile number
    let existingMobile = await UserModel.findOne({ mobile });
    if (existingMobile) {
      const message = "Mobile number already exists";
      return res ? res.status(409).json({ status: "fail", message }) : { status: "fail", message };
    }

    // Default values for optional fields
    img_url = img_url || "default_image_url";
    status = status || "active";
    role = role || "user";

    // Hash the password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (hashError) {
      console.error("Error hashing password:", hashError.message);
      const message = "Error processing password.";
      return res ? res.status(500).json({ status: "fail", message }) : { status: "fail", message };
    }

    // Create new user
    let newUser = new UserModel({
      name,
      email,
      mobile,
      password: hashedPassword,
      img_url,
      status,
      role,
    });

    // Save user
    await newUser.save();

    const message = "User registered successfully";
    return res ? res.status(201).json({ status: "success", message }) : { status: "success", message };
  } catch (e) {
    console.error("Error in SignUpService:", e.message);
    const message = "Something went wrong during signup.";
    return res ? res.status(500).json({ status: "fail", message }) : { status: "fail", message };
  }
};


// Login Service
const LoginService = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ status: "fail", message: "Email and password are required." });
    }

    email = email.toLowerCase();

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ status: "fail", message: "Invalid email or password." });
    }

    // Log entered password and stored hashed password
    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", user.password);

    // Ensure the stored password is properly hashed (check for bcrypt hash format)
    if (!user.password.startsWith("$2b$")) {
      console.error("Stored password is not hashed properly!");
      return res.status(500).json({ status: "fail", message: "Server error: password hash issue." });
    }

    // Compare entered password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ status: "fail", message: "Invalid email or password." });
    }

    // If password matches, return success
    return res.status(200).json({
      status: "success",
      message: "Login successful.",
      user: { name: user.name, email: user.email, mobile: user.mobile },
    });
  } catch (error) {
    console.error("Login Error:", error);
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
