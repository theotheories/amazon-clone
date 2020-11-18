// functions folder contains the full backend. make sure that any npm installs are done in ./functions from now on. 
// auto comment below:
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

//now i install express, cors, stripe with npm
const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51HoY1tFVUMWkRx8VYjiaa2Q4uImBn378SbssPQ2WEvMB6TpOlZZdW7Ch2jZw7dxeiOtODeBhyL9bTndlvVTVfied00D6tec5vD");

// setting up api requires the following: -

// - App config
const app = express();

// -  middlewares
app.use(cors({ origin: true}));
// cors is like a security
app.use(express.json());
// send data and pass it in the json format

// - api routes
// set up a dummy route to test that things are working
app.get("/", (request, response) => res.status(200).send("hello world"))

// - listen command
// secure cloud functions coming in here
// this is the setup needed to get the backend express app running on a cloud function.
// we can emulate this on local with firebase, in order to test it before deploy
// terminal - firebase emulators:start
exports.api = functions.https.onRequest(app)