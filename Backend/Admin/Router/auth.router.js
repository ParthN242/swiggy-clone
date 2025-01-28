const express = require("express");
const {
  adminLogin,
  adminCreate,
  adminProfile,
  adminLogout,
} = require("../Controller/auth.controller.js");
const verifyAdmin = require("../Middleware/verifyAdmin.js");

const router = express.Router();

router
  .post("/login", adminLogin)
  .get("/profile", verifyAdmin, adminProfile)
  .get("/logout", verifyAdmin, adminLogout);

module.exports = router;
