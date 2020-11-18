// a very popular fetchin library that allows you to interact with apis
// very widely used
import axios from "axios";

const instance = axios.create({
    baseURL: "https://us-central1-clone-1801d.cloudfunctions.net/api"
});
// card number to use is 4242424242424242 4/24 for testing purposes
// firebase deploy --only functions deploys just the backend when cd'ed into /functions
// firebase deploy --only hosting  is to deploy the front end
// firebase hosted https api url cloud functions is https://us-central1-clone-1801d.cloudfunctions.net/api
// // the API (cloud function) URL. when i run firebase emulators:start it gave me a local URL i can use for this local API endpoint
// local was "http://localhost:5001/clone-1801d/us-central1/api"
export default instance; 