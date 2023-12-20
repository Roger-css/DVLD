import ax from "axios";

const axios = ax.create({
  baseURL: "https://localhost:7123/api",
  withCredentials: true,
});

export default axios;
