const express = require("express");
const router = express.Router();
const { Register, Login, GetCompanies } = require("./company.controller");

router.post("/register", Register);
router.post("/login", Login);
router.get("/getcompanies", GetCompanies);

module.exports = router;
