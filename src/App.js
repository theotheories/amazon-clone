import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
//now we create a listener, useEffect, which keeps track of who is signed in.

const promise = loadStripe("pk_test_51HoY1tFVUMWkRx8VExEWDw4sYbM7y7epJUezhRteaibBjrsjosWGdSVNsKuvv4zUczYsk2qoW1IawmbgswdXiZx900hgivBTsu");

function App() {
  //magic react context api usage code line
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    // will only run once when the app component loads because it is left blank. its like an if statement in React,
    // as soon as app loads, this listener is always there. it gives us the authenticated user whenever the user changes.
    // otherwise its null. we will use console log to see the user
    auth.onAuthStateChanged((authUser) => {
      console.log("The user is >>> ", authUser);
      //authUser can now be seen in the console on loading the app. there is lots of useful info that can be accessed there including whether the email is verified, as well as the display name of the user.
      if (authUser) {
        //then the user just logged in or was already logged in. even if you refresh the page it will log you back in
        dispatch({
          type: "SET_USER",
          // this will shoot off the event into the data layer
          // will need a switch case for this
          user: authUser,
        });
      } else {
        //the user is logged out. we will keep the user in the reducer data layer.
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    // BEM
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
