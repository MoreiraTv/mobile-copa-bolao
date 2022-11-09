import axios from 'axios';

export const api = axios.create({
    // baseURL: 'http://192.168.0.22:3333/'
    baseURL: 'http://192.168.0.207:3333/'
})