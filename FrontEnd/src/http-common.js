
import axios from "axios";
const backendURL = 'http://127.0.0.1:5000'

export default axios.create({
  baseURL: `${backendURL}/api`,
  headers: {
    "Content-type": "application/json"
  }
});