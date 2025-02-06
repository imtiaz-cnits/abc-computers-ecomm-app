const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
    {
        img_url: { type: String, default: "default_image_url" },
        name: { type: String, required: true },
        email: { type: String, unique: true, lowercase: true, required: true },
        mobile: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        status: { type: String, default: "active" },
        role: { type: String, default: "user" },
        otp: { type: String },
    },
    { timestamps: true, versionKey: false }
);

// Ensure password is always hashed before saving
DataSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    console.log("Hashing Password: ", this.password); // Debugging line

    // Hash the password before saving it
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        console.error("Error hashing password: ", err.message);
        next(err); // Pass the error to the next middleware
    }
});

// Add custom validation for unique fields to handle duplicate key errors better
DataSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        if (error.message.includes('email')) {
            next(new Error('Email already exists'));
        } else if (error.message.includes('mobile')) {
            next(new Error('Mobile number already exists'));
        } else {
            next(new Error('Duplicate field error'));
        }
    } else {
        next(error);
    }
});

const UserModel = mongoose.model("users", DataSchema);
module.exports = UserModel;
