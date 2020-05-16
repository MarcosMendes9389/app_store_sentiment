const express = require("express")
const knex = require("./config").knex
const oncatch = require("./config").oncatch

const router = express.Router()

router.get("/list", (req,res) => res.send("List OK"))

router.post("/save", (req,res) => res.send("Save Ok"))

exports.router = router