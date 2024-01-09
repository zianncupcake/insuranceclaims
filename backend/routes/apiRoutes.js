const express = require("express")

const app = express()
const usersRoutes = require("./usersRoutes")
const claimsRoutes = require("./claimsRoutes")
const policiesRoutes = require("./policiesRoutes")

app.use("/users", usersRoutes)
app.use("/claims", claimsRoutes)
app.use("/policies", policiesRoutes)

module.exports = app