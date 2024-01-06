const express = require("express")



const app = express()
app.use(express.json())


const apiRoutes = require("./routes/apiRoutes")

app.use('/api', apiRoutes)

// app.get("/", (req,res) => {
//     res.json("hello this is the backend")
// })

app.listen(8800, () => {
    console.log("Connected to backend!")
})