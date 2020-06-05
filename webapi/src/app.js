const mongo = require('./mongo.js');
const express = require("express")

const router = express.Router()

router.get("/all", async (req, res) => {
    const reviews = await mongo.findAllApps();
    res.send(reviews);
});

router.post("/save", async (req,res) => {
    const app =  await mongo.insertApp(req.body)
    res.send(app)
})

router.put("/update", async (req,res) => {
    let app = req.body
    app =  await mongo.updateAppById(app._id, app)
    res.send(app)
})

router.delete("/delete/:id", async (req,res) => {
    result =  await mongo.deleteApp(req.params.id)
    res.send(result)
})

exports.router = router