const mongoose = require("mongoose")

const TicketSchema = mongoose.Schema({
    isRead: {
        type: Boolean,
        required: false,
        default: false
    },
    text: {
        type: String,
        required: false,
        default: "Nothing here"
    }
})

const Ticket = mongoose.model("Ticket", TicketSchema)

module.exports = Ticket