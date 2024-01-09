const express = require('express')

const router = express.Router()

const {getUsers, getUser, loginUser} = require("../controllers/usersController")

router.get("/", getUsers)
router.get("/getone/:id", getUser)
router.post("/login", loginUser)
// router.post("/register", registerUser)

module.exports = router