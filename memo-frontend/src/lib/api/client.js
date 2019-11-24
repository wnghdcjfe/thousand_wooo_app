import axios from 'axios'
const client = axios.create()
client.defaults.baseURL = 'http://external-api-server.com/'
client.defaults.headers.common['Authorization'] = '' 
axios.interceptors.response.use(response => response, error => Promise.reject(error))
 
export default client;