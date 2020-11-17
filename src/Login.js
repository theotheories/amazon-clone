import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import { auth } from "./firebase";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  // dont use null use an empty string
  const [password, setPassword] = useState("");
  const signIn = (e) => {
    e.preventDefault();
    // this line is important as it stops page refreshing
    // we generally want to not allow page refreshing in React
    // some fancy firebase login stuff
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        //this line only says if the user has authenticated, then push them to the homepage
        // useEffect within App.js is doing all the hard work
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    // some fancy firebase register stuff
    console.log({ auth });
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
          // this forces you to redirect if you succesfully register
        }
      })
      .catch((error) => alert(error.message));
    console.log({ auth });
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          alt="Return to Homepage"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>

      <div className="login__container">
        <h1>Sign in</h1>
        <form>
          <h5>Email</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          {/* (e.target.value) is what the user just typed in */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="login__signInButton"
            type="submit"
            onClick={signIn}
          >
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
       
        <button className="login__registerButton" onClick={register}>
          New to Amazon? Click here
        </button>
      </div>
    </div>
  );
}

export default Login;
