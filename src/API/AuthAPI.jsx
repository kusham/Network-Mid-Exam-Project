import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });

export const logIn= (formData)=> API.post('/auth/login',formData);

export const signUp = (formData) => API.post('/auth/register', formData);


API.interceptors.request.use((req) => {
    if (sessionStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`;
    }
  
    return req;
  });

export const getUser = (userId) => API.get(`/user/${userId}`);
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);
export const getAllUser = ()=> API.get('/user')
export const followUser = (id,data)=> API.put(`/user/${id}/follow`, data)
export const unFollowUser = (id, data)=> API.put(`/user/${id}/unfollow`, data)


export const uploadImage = (data) => API.post("/upload/", data);
