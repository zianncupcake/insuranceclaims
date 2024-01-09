const express = require('express')

const router = express.Router()

const {getClaims, createClaim, editClaim, deleteClaim, getClaim, adminGetClaims, adminEditClaim} = require("../controllers/claimsController")

router.get("/:employeeid", getClaims) //get claims of specific employeeid via req.query
router.post("/", createClaim)
router.get("/getone/:claimid", getClaim)
router.put("/:claimid", editClaim) //edit claim with specfic claimid
router.delete("/:claimid", deleteClaim)

router.get("/", adminGetClaims) //admin get all claims
router.patch("/", adminEditClaim)
module.exports = router