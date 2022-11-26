import axios from 'axios'


const API = axios.create({ baseURL: 'http://social-load-balancer-595777080.ap-south-1.elb.amazonaws.com' });

export const logIn= (formData)=> API.post('/auth/login',formData);

export const signUp = (formData) => API.post('/auth/register', formData);


// export const getUser = (userId) => API.get(`/auth/user/${userId}`);
// export const updateUser = (id, formData) => API.put(`/auth/user/${id}`, formData);
// export const getAllUser = ()=> API.get('/auth/users/all')
// export const followUser = (id,data)=> API.put(`/auth/user/${id}/follow`, data)
// export const unFollowUser = (id, data)=> API.put(`/auth/user/${id}/unfollow`, data)


