const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/LoginSignup")
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log("Failed to Connect to MongoDB:", error);
    });

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const AdminLoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const AppoinmentDetails = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
});

const collection = mongoose.model("Details", LoginSchema);
const Appoinment = mongoose.model("DetailsOfCustomers", AppoinmentDetails);
const AdminPass = mongoose.model("AdminPassword", AdminLoginSchema )
module.exports = { collection, Appoinment,AdminPass };
