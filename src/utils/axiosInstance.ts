const axios = require('axios');

// Create a new Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.IG_URL,
  timeout: 5000,
//   headers: {
//     'Authorization': 'Bearer TOKEN'
//   }
});

export default axiosInstance; 
