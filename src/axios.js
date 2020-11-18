// a very popular fetchin library that allows you to interact with apis
// very widely used
import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5001/clone-1801d/us-central1/api" // the API (cloud function) URL. when i run firebase emulators:start it gave me a local URL i can use for this local API endpoint
});

export default instance;