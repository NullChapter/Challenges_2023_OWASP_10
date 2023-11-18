const {createUser} = require("../db");

module.exports = async (req, res) => {
    try{
        const username = await req.body.username;
        if(username === "admin"){
            throw new Error("admin user already exists!");
        }
        const password = await req.body.password;
        let ret = await createUser(username, password);
        if(ret !== -1) return res.json({"message" : "user registered successfully!"});
        return res.json({"message" : "user exists"});
    }
    catch(err){
        return res.json({"error" : err});
    }
}; 