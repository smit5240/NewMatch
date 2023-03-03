const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const Key = process.env.KEY;

// .................................................................     User Register     ......

router.post("/register", async (req, res) => {
  const { name, email, password, authorize } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: 400, message: "Fill All Property", type: "warning" });
    } else {
      const user = new User({ name, email, password, authorize });
      const verify = await User.findOne({ email });
      if (verify) {
        return res.status(404).send({
          status: 404,
          message: "user allready registed",
          type: "warning",
        });
      } else {
        user
          .save()
          .then(() => {
            res.status(200).send({
              status: 200,
              message: "User Register Successfull",
              type: "success",
            });
          })
          .catch((e) => {
            return res
              .status(404)
              .send({ status: 404, message: e, type: "danger" });
          });
      }
    }
  } catch (error) {
    return res
      .status(400)
      .send({ status: 400, message: error, type: "danger" });
  }
});

// ...............................................................          User Login     ......

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: 404, messaage: "Fill all Property", type: "warning" });
    } else {
      const data = await User.findOne({ email });
      if (!data) {
        return res
          .status(404)
          .json({ status: 404, message: "User Not Find", type: "warning" });
      } else {
        const match = await bcrypt.compare(password, data.password);
        if (match) {
          const { name, email, authorize } = data;
          const userdata = {
            name,
            email,
            authorize,
          };
          const token = JWT.sign(userdata, Key);
          res.status(200).json({
            status: 200,
            message: "Login Successfull",
            token,
            userdata,
            type: "success",
          });
        } else {
          return res.status(404).json({
            status: 404,
            message: "Password Not match",
            type: "warning",
          });
        }
      }
    }
  } catch (error) {
    return res
      .status(400)
      .send({ status: 400, message: error, type: "danger" });
  }
});

module.exports = router;
