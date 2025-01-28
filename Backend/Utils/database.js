const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Database Connection

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((error) => {
      console.log("Something wrong in database connection");
      console.log(error);
    });
};

module.exports = dbConnection;
