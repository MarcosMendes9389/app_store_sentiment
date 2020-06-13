
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")

const  expressApplication = express()

expressApplication.use(cors())
expressApplication.use(morgan("dev"))
expressApplication.use(bodyParser.json())

expressApplication.use("/app",require("./app").router)
expressApplication.use("/review",require("./review").router)
expressApplication.use("/dashboard",require("./dashboard").router)

expressApplication.listen(config.server.port, _ => {
  console.log("server online")
}) 