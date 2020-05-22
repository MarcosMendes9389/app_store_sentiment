const mongo = require('./mongo.js');
const express = require("express")

const router = express.Router()

router.get("/all", async (req, res) => {
    const reviews = await mongo.findAllApps();
    res.send(reviews);
});

router.post("/save", (req,res) => res.send("Save Ok"))

exports.router = router