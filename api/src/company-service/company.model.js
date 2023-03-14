const mongoose = require("mongoose");

const companySchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Please add a company name"],
    },
    founder: {
      type: String,
      required: [true, "Please add a founder name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    phone: {
      type: Number,
      required: [true, "Please add a phone number"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    location: {
      Latitude: {
        type: Number,
      },
      Longitude: {
        type: Number,
      },
    },
    ICE: {
      type: Number,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("company", companySchema);
