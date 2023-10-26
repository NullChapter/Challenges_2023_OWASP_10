const express = require('express')
const cors = require("cors")
const router = require("./routes.js")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cors())
app.set("view engine", "ejs")
app.use(router)

mongoose.connect(
    process.env.DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: "admin"
    }
).then(() => {
    console.log("CONNECTED TO THE DATABASE.")
}).catch(err => {
    console.err("ERROR CONNECTING TO DB: " + err)
})

app.listen(port, () => {
    console.log(`xss-attack-server has started. Connect: http://localhost:${port}/`)
})