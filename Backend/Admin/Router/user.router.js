const express = require("express");
const { getAllUsers, deleteUser } = require("../Controller/user.controller.js");
const verifyAdmin = require("../Middleware/verifyAdmin.js");

const router = express.Router();

router
  .get("/all", verifyAdmin, getAllUsers)
  .delete("/:userId", verifyAdmin, deleteUser);

module.exports = router;
