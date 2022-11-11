import axios from "axios";

const API = axios.create({ baseURL: "" });

API.interceptors.request.use((req) => {
    if (sessionStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`;
    }
  
    return req;
  });
 
export const uploadPost = (data) => API.post("/posts", data);

export const getTimelinePosts= (id)=> API.get(`/posts/${id}/timeline`);
export const likePost=(id, userId)=>API.put(`/posts/${id}/like`, {userId: userId})
export const commentPost=(id, data)=>API.post(`/posts/${id}/comment`, data)
export const deletePost=(id)=>API.delete(`/posts/${id}`)

