const asyncHandler = require("express-async-handler");
const Company = require("./company.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @desc    Register a new company
// @route   POST /api/company/register
// @access  Public
const Register = asyncHandler(async (req, res) => {
  const { companyName, founder, email, password, phone, address } = req.body;

  if (!companyName || !founder || !email || !password || !phone || !address) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //check if user exists
  const companyExists = await Company.findOne({ email });
  if (companyExists) {
    res.status(400);
    throw new Error("This Company already exists");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Generate ICE
  function generateUniqueNumber() {
    const randomNumber =
      Math.floor(Math.random() * 100000000000000000) + 100000000000000000;
    return randomNumber;
  }

  //Create Company
  const company = await Company.create({
    companyName,
    founder,
    phone,
    address,
    ICE: generateUniqueNumber(),
    email,
    password: hashedPassword,
  });

  if (company) {
    res.status(201).json({
      _id: company.id,
      name: company.companyName,
      email: company.email,
      token: generateToken(company._id),
      ICE: company.ICE,
      message: "Your company has been created successfully",
      status: "SUCCESS",
    });
  } else {
    res.status(400);
    throw new Error("Invalid company data");
  }
});

// @desc    Auth user & get token
// @route   POST /api/user/login
// @access  Public
const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Check for company email
  const company = await Company.findOne({ email });
  if (!company) {
    res.status(400).json({
      message: "Company does not exist",
      status: "ERROR",
    });
  }

  //check for password match
  const isPasswordCorrect = await bcrypt.compare(password, company.password);
  if (!isPasswordCorrect) {
    res.status(400).json({
      message: "Invalid credentials",
      status: "ERROR",
    });
  }

  if (company && (await bcrypt.compare(password, company.password))) {
    res.json({
      _id: company.id,
      name: company.name,
      email: company.email,
      token: generateToken(company._id),
      message: "You have successfully logged in",
      status: "SUCCESS",
    });
  } else {
    res.status(401).json({
      message: "Invalid credentials",
      status: "ERROR",
    });
  }
});


// @desc    Get all companies
// @route   GET /api/company/getcompanies
// @access  Public
const GetCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.find({});
  res.json(companies);
});

// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
module.exports = { Register, Login, GetCompanies };
