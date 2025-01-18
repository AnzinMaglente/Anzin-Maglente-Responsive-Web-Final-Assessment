// require allows a module to be available in the global scope.
const express = require('express');
const path = require("path");
const bodyParse = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const dialog = require('dialog');

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParse.json())

// This sets the view engine to ejs(embedded javascript) which transforms the file into an html.
app.set("view engine", "ejs");
// This finds the "view" directory inside the main folder. 
app.set("views", path.join(process.cwd(), "views"));
app.use(express.static(path.join(__dirname, "views")));

app.use(bodyParse.urlencoded({
    extended:true
}))

mongoose.connect("mongodb://0.0.0.0:27017/userInfo")

var db = mongoose.connection;

// Check conncetion
db.on("error", ()=>console.log("error in connecting to database"))
db.once("open",()=>console.log("Connected to Database"))

// This request a certain path to callback a designated function.
app.get("/", (req, res) => {
    // This renders the index ejs file into an html website.
    res.render("index");
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/article', (req, res) => {
    res.render('individual-article')
})

// Gathers data
const userSchema = new mongoose.Schema ({
    username:String,
    password:String,
    email:String,
})

const Users = mongoose.model("data", userSchema)

app.post("/registrationAction", async (req, res)=> {
    const {username, passwordtext, email} = req.body

    if (req.body.passwordtext !== req.body.passwordVer) {
        var err = new Error('Passwords do not match.');
        console.log(err)
        dialog.err("Error, your passwords do not match");
        return res.redirect('/signup');
    } 

    else {
        const password = await bcrypt.hash(passwordtext, saltRounds)

        const user = new Users({
            username,
            password,
            email
        })
        
        await user.save()
        console.log(user)
        dialog.info("Welcome " + user.username + "! I hope you have a great stay here.");
        return res.redirect('/');
    }
})

app.post("/signinAction", async (req, res) => {
    const { email, passwordtext } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
        var err = new Error('User not found.');
        console.log(err);
        dialog.err("User not fount");
        return res.redirect('/signin');
    }

    const isPasswordCorrect = await bcrypt.compare(passwordtext, user.password);

    if (!isPasswordCorrect) {
        var err = new Error('Incorrect password.');
        console.log(err);
        dialog.err("Error, your passwords do not match");
        return res.redirect('/signin');
    }

    console.log('User signed in successfully');

    dialog.info("Welcome back! " + user.username);

    return res.redirect('/');
});

// This listens for when the server/port is active.
app.listen(port, () => {
    // This creates a log inside the console to make it easier to run.
    console.log(`Server running at http://localHost:${port}`);
})

// Credits to John Layda (a friend of mine) for teaching me these things.
