// a very popular fetchin library that allows you to interact with apis
// very widely used
import axios from "axios";

const instance = axios.create({
    baseURL: "..." // the API (cloud function) URL
});

export default instance;