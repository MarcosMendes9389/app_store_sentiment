const mongo = require('./mongo.js');
const express = require("express")

const router = express.Router()

router.get("/all", async (req, res) => {
  const reviews = await mongo.findAllReviews();
  res.send(reviews);
});

exports.router = router