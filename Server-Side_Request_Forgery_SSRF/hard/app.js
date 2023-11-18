const express=require("express")
const app=express();
const bparser=require("body-parser")
const path=require('path')
const needle=require("needle")
const proxy=require("./routes/request");
var json=bparser.json();

app.use(bparser.urlencoded({ extended: true }));
app.use("/",proxy)


//variables
const port =2640
//index route
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname+"/index.html"))

})
app.get('/flag',(req,res)=>{
    res.send("<h2>Ramanujan wants to know Hardy's Taxi number! Wonder why??</h2>")
})

//post route



//server listiner 
app.listen(port,()=>{
    console.log("server started")
})