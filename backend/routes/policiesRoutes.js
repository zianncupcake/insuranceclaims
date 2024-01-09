const express = require('express')

const router = express.Router()

const {getInsurances, getInsurance} = require("../controllers/policiesController")

router.get("/:employeeid", getInsurances) 
router.get("/getone/:insuranceid", getInsurance)

module.exports = router