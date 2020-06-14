const mongo = require('./mongo.js');
const express = require("express")

const router = express.Router()

router.get("/google/classification/app/date", async (req, res) => {
  const resul = await mongo.findClassificationAppDatebyHour();
  res.send(resul);
});

router.get("/ranking/app/classification/positivo", async (req, res) => {
  const resul = await mongo.findRankingAppClassificationPositivo();
  res.send(resul);
});

router.get("/ranking/app/classification/negativo", async (req, res) => {
  const resul = await mongo.findRankingAppClassificationNegativo();
  res.send(resul);
});

exports.router = router