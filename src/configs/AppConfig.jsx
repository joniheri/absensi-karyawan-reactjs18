import axios from "axios";

export const ApiBaseUrl = axios.create({
  baseURL: "http://localhost:3001/api",
});
