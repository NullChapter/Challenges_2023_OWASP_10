const express = require('express')
const cookieParser = require("cookie-parser")
const path = require("path")
const dotenv = require("dotenv")
const Ticket = require("./models.js")
const mongooseSanitize = require("express-mongo-sanitize")
dotenv.config()

const router = express();
router.use(express.json())
router.use(cookieParser("SECRET"))
router.use(mongooseSanitize())

const fixedUsername = process.env.BOT_USERNAME
const fixedPassword = process.env.BOT_PASSWORD
const fixedFlag = process.env.FLAG

router.get('/', (req, res) => {
    res.render("home")
})

router.post('/upload', (req, res) => {
    const ticket = req.body.ticket
    let ticketObject = new Ticket({text: ticket})
    ticketObject.save()
        .then(() => {res.json({message: "success"})})
        .catch(() => {res.json({message: "error"})})
})

router.get('/login', (req, res) => {
    res.render("login")
})
router.post('/login', (req, res) => {
    data = req.body
    if (data.username != fixedUsername || data.password != fixedPassword) {
        res.json({message: "error"})
    } else {
        res.cookie("username", fixedUsername)
        res.cookie("password", fixedPassword)
        res.json({message: "success"})
    }
})

router.get('/admin', (req, res) => {
    const username = req.cookies.username
    const password = req.cookies.password
    if (username === fixedUsername, password === fixedPassword) {
        res.render("admin", {flag: fixedFlag})
    } else {
        res.redirect("/login")
    }
})

router.get('/issues', (req, res) => {
    if (req.ip === "::1" || req.ip === "127.0.0.1") {
        Ticket.find({isRead: false})
            .then(tickets => {
                tickets.forEach(ticket => {
                    ticket.isRead = true;
                  });
                  return Promise.all(tickets.map(ticket => ticket.save()));
            })
            .then(updatedTickets => {
                const ticketIds = updatedTickets.map(ticket => ticket.id);
                res.render("issues", {ids: ticketIds})
            }).catch(err => {
                res.render("issues", {ids: "error"})
                console.log(err)
            })
    } else {
        res.status(403).send("You are not allowed to open this. It is not necessary for the ctf.")
    }
})

router.get('/issue/:id', (req, res) => {
    if (req.ip === "::1" || req.ip === "127.0.0.1") {
        const req_id = req.params.id
        Ticket.findById(req_id)
            .then(ticket => {
                res.render("issue", {text: ticket.text})
            }).catch(err => {
                res.render("issue", {text: "Error occurred"})
                console.log(err)
            })
    } else {
        res.status(403).send("You are not allowed to open this. It is not necessary for the ctf.")
    }
})

module.exports = router