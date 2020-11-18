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
// good for debugging. ive seen hello world on the webpage commented below with port 5001 etc 
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
    // handle query params
    const total = request.query.total;
    console.log("Payment request received for this amount >>> ", total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // in subunits of the currency
        currency: "gbp", // use correct currency code
    });

    // 200 = all OK, 201 = everything OK, something created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})
// - listen command
// secure cloud functions coming in here
// this is the setup needed to get the backend express app running on a cloud function.
// we can emulate this on local with firebase, in order to test it before deploy
// terminal - firebase emulators:start
// spins up the express server, on localhost port 4000. also find functions[api] http function initialised with a url endpoint
// example endpoint http://localhost:5001/clone-1801d/us-central1/api
exports.api = functions.https.onRequest(app)
// the .api ^ is where the  http://localhost:5001/clone-1801d/us-central1/api get its /api at the end. 