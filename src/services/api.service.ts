import axios from "axios";
import useConfig from "../hooks/useConfig";

const { get } = useConfig();

const api = axios.create({
  baseURL: get("serverUrl") + "/api",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
