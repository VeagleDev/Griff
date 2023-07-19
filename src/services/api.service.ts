import axios from "axios";
import useConfig from "../hooks/useConfig";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { get } = useConfig();

const api = axios.create({
  baseURL: await get("serverUrl"),
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + (await get("token")) || "",
  },
});

export default api;
