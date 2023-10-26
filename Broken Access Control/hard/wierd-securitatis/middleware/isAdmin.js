const jwt = require('jsonwebtoken');

exports.isAdmin = (req,res,next) => {
    const token = req.cookies.token;
    try{
        const username = jwt.verify(token, process.env.SECRET);
        req.username = username;
        if(username['username'] === "admin"){
            next();
        }
        else{
            res.clearCookie("token");
            return res.redirect("/");
        }
    }
    catch (err){
        res.clearCookie("token");
        return res.redirect("/");
    }
}