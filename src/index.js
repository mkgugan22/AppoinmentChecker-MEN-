const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose'); // Import Mongoose
const { collection, Appoinment, AdminPass } = require('./mongodb'); // Import Mongoose models


const templatePath = path.join(__dirname, '../templates');


app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/LoginSignup")
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log("Failed to Connect to MongoDB:", error);
    });


app.get("/", (req, res) => {
    res.render("index");
});


app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/login",(req,res)=>{
    res.render("login");
})
app.get("/home", (req, res) => {
    res.render("home");
});
 
app.get("/about",(req,res)=>{
    res.render("about");
})

app.get("/Admin",(req,res)=>{
    res.render('Admin',{Appoinmentdata:Appoinmentdata})
});


app.get("/AdminLogin", (req, res) => {
    res.render("AdminLogin");
});



app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    };
    await collection.create(data); // Use create instead of insertMany for a single document
    res.render("home");
});



app.post("/Admin", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    };
    await AdminPass.create(data); // Use create instead of insertMany for a single document
    res.render("AdminDetails");
});



app.post("/home", async (req, res) => {

    const Appoinmentdata = {
        name: req.body.FirstName,
        email: req.body.email,
        date: req.body.date,
        time: req.body.time,
        purpose: req.body.purpose
    };
    await Appoinment.create(Appoinmentdata); // Use create instead of insertMany for a single document

    res.render("Success");
});



app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name });
        if (check.password === req.body.password) {
            res.render("home");
        } else {
            res.send("Wrong Password");
        }
    } catch (error) {
        console.error(error);
        res.send("Wrong Details");
    }
});



app.post("/AdminLogin", async (req, res) => {
    try {
        const data = await Appoinment.find({});
        const check = await AdminPass.findOne({ name: req.body.name });
        if (check && check.password === req.body.password) {

            res.render("AdminDetails",{data});
        } else {
            res.send("Wrong Password");
        }
    } catch (error) {
        console.error(error);
        res.send("Wrong Details");
    }
});


app.get("/AdminLogin",async (req,res) =>{
// const data = await Appoinment.find({});
console.log(data);
if(data){
res.render("AdminDetails",{data});
}
});
app.listen(5000, () => {
    console.log('Port Connected');
});


app.post("/AdminLogin", async(req,res)=>{
  const search = document.getElementById('search').value;
  const data = await Appoinment.find({});
  if(search === "asc"){
     data = await Appoinment.find({$sort:date});
  }
})