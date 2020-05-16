
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(bodyParser.json())

app.use("/app",require("./app").router)
app.use("/review",require("./review").router)

app.listen(config.server.port, _ => {
  console.log("server online")
}) 