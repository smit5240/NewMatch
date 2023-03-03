const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

let Api = process.env.API;

const ConnectTomongo = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(Api)
    .then(() => {
      console.log("Connection Successfull");
    })
    .catch((err) => {
      console.log("ERROR : ", err);
    });
};

module.exports = ConnectTomongo;
