const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      lowercase: true, // Forces emails to lowercase to prevent duplicates (e.g., Test@Test.com vs test@test.com)
      trim: true, // Automatically removes accidental leading or trailing spaces
      match: [
        // /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ]
    },

    password: {
      type: String,
      required: true,
      select :false,
      // match:[]
    },

    phone: {
      type: String,
    },

    profileImage: {
      type: String,
    },

    address: {
      type: String,
    },
     role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;
