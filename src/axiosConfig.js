import Axios from 'axios'

const request = Axios.create({
    baseURL:'http://localhost:8082',
    //baseURL: 'https://entidades-geo-backend.uc.r.appspot.com'
});

request.interceptors.request.use(config=>{
    const token = localStorage.getItem('t');
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
});

export default request;