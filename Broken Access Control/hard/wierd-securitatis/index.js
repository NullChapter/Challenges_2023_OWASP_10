const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require("cookie-parser");
const { isAdmin } = require('./middleware/isAdmin');
const adminRoute = require('./routes/adminlogin');
const { isAuthorized } = require('./middleware/isAuthorized');
const userRoute = require('./routes/userlogin');
const registerRoute = require('./routes/usersignup');

app.use(
    express.urlencoded(
        {
            extended: true,
        }
    )
);
app.use(express.json());

app.use(cookieParser());

const port = process.env.PORT || 3000; // Use the environment's PORT if available, otherwise, use port 3000

// Define routes
app.get('/', (req, res) => {
  res.send(`Homepage! Not a dashboard :-)`);
});

// Routes
app.post("/admin/", adminRoute);
app.post("/flag/", isAdmin, (req,res) => {
  res.json({"flag" : "NULL{YOU_NOW_HAVE_AN_UNDERSTANDING_OF_JWT}"});
});
app.get("/home/", isAuthorized, (req,res) => {
  res.json({"message" : "Good Job you created an account! Now what?"});
})
app.post("/login/", userRoute);
app.post("/register/", registerRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
