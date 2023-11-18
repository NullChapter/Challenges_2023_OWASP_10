const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
dotenv.config()

const app = express()
const port = process.env.PORT
const fixedFlag = process.env.FLAG
const fixedKey = process.env.COOKE_KEY

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser(fixedKey))
app.use('/greeting/:name', csrf({cookie: true}))
app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render("home")
})
app.post('/generate', (req, res) => {
    userName = req.body.name
    console.log(req.body)
    res.redirect(`/greeting/${userName}`)
})

app.get('/greeting/:name', (req, res) => {
    const csrfToken = req.csrfToken()
    res.cookie('XSRF-TOKEN', csrfToken);
    res.render("birthday", {user_name: req.params.name})
})
app.post('/send', (req, res) => {
    if (req.body.message === "Done") {
        res.json({message: fixedFlag})
    } else {
        res.json({message: "Wrong"})
    }
})

app.listen(port, () => {
    console.log(`Easy XSS challenge server has started. Connect: http://localhost:${port}/`)
})