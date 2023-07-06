import axios from "axios";
import useConfig from "../hooks/useConfig";

const { get } = useConfig();

const api = axios.create({
  baseURL: get("serverUrl") + "/api",
});

export default api;