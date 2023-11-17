const jwt = require("jsonwebtoken");
const {getUserByUsername} = require("./../db");
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await getUserByUsername(username);
    if(!user) return res.json({error: "invalid login"});
    if(!bcrypt.compare(password, user.password)){
        return res.status(403).json(
            {
                error: "invalid login",
            }
        );
    }

    delete user.password;

    const token = jwt.sign(user, process.env.SECRET, {expiresIn : "1h"});

    res.cookie("token", token, {
        httpOnly: true,
    });
    return res.redirect("/home/");
}