const express = require('express')

const router = express.Router()

const {getClaims, createClaim, editClaim, deleteClaim} = require("../controllers/claimsController")

router.get("/:employeeid", getClaims) //get claims of specific employeeid via req.query
router.post("/", createClaim)
router.put("/:claimid", editClaim) //edit claim with specfic claimid
router.delete("/:claimid", deleteClaim)

module.exports = router