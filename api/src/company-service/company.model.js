const mongoose = require("mongoose");

const companySchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Please add a company name"],
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
      latitude: {
        type: Number,
        // required: [true, "Please add a latitude"],
      },
      longitude: {
        type: Number,
        // required: [true, "Please add a longitude"],
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
