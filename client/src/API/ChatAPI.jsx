import axios from 'axios'


const API = axios.create({ baseURL: 'http://social-load-balancer-595777080.ap-south-1.elb.amazonaws.com' });

export const createChat = (data) => API.post('/chat/', data);

export const userChats = (id) => API.get(`/chat/${id}`);

export const findChat = (firstId, secondId) => API.get(`/chat/find/${firstId}/${secondId}`);

export const getMessages = (id) => API.get(`/message/${id}`);

export const addMessage = (data) => API.post('/message/', data);