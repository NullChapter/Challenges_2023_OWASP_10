const jwt = require("jsonwebtoken");

const getAdminUser = async () => {
    return {password: process.env.ADMIN_PASSWORD, username: process.env.ADMIN_USERNAME};
}

module.exports = async (req, res) => {
    const {username, password} = req.body;
    const user = await getAdminUser();
    if(user.password !== password){
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

    return res.json({"flag" : "NULL{YOU_NOW_HAVE_AN_UNDERSTANDING_OF_JWT}"});
}