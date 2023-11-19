import axios from "axios";
import UseConfig from "../hooks/useConfig";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { get } = UseConfig();

const api = axios.create({
  baseURL: await get("serverUrl"),
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + (await get("token")) || "",
  },
});

export default api;
