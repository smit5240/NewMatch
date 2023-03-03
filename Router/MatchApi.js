const express = require("express");
const Match = require("../model/Match");
const router = express.Router();

// .................................................  Create Match ..............

router.post("/addmatch", async (req, res) => {
  const { name, email, contact, address } = req.body;

  try {
    if (!name || !email || !contact || !address) {
      return res
        .status(502)
        .send({ status: 502, message: "Fill all Property", type: "warning" });
    }
    const verify = await Match.findOne({ email });
    if (verify) {
      return res.status(400).send({
        status: 400,
        message: "This Match Allready declared",
        type: "warning",
      });
    }
    const newmatch = new Match({ name, email, contact, address });
    const add = newmatch.save();
    if (add) {
      res.status(200).send({
        status: 200,
        message: "Match add Successfull",
        type: "success",
      });
    } else {
      return res
        .status(404)
        .send({ status: 404, message: "Match Not add", type: "warning" });
    }
  } catch (error) {
    return res
      .status(400)
      .send({ status: 400, message: error, type: "danger" });
  }
});

// ................................................................  Show All Match  .....

router.get("/allmatch", async (req, res) => {
  try {
    const allmatches = await Match.find();
    if (allmatches) {
      res.status(200).send({
        status: 200,
        message: "Show AllMatch",
        allmatches,
        type: "success",
      });
    } else {
      return res.status(404).send({
        status: 404,
        message: "No Match added by User",
        type: "warning",
      });
    }
  } catch (error) {
    return res
      .status(400)
      .send({ status: 400, message: error, type: "danger" });
  }
});

// ..............................................................   Find Single match  ........

router.get("/singlematch/:id", async (req, res) => {
  try {
    const oneuser = await Match.findById(req.params.id);
    if (oneuser) {
      res.status(200).send({
        status: 200,
        message: "Show User Data",
        oneuser,
        type: "success",
      });
    } else {
      return res
        .status(404)
        .send({ status: 404, message: "No Find User Data", type: "warning" });
    }
  } catch (error) {
    return res
      .status(400)
      .send({ status: 400, message: error, type: "danger" });
  }
});

module.exports = router;
