import axios from "axios";

const API = axios.create({ baseURL: "" });

export const uploadImage = (data) => API.post("/image/upload", data);
