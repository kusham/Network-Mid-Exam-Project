import axios from "axios";

const API = axios.create({ baseURL: "http://social-load-balancer-595777080.ap-south-1.elb.amazonaws.com" });

export const uploadImage = (data) => API.post("/image/upload", data);
