import ax from "axios";
const baseURL = "http://localhost:5156/api";
const axios = ax.create({
  baseURL: baseURL,
  withCredentials: true,
});
export default axios;
