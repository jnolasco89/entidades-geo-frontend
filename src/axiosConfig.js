import Axios from 'axios'

const request = Axios.create({
    //baseURL:'http://localhost:8082'
    baseURL: 'https://entidades-geo-backend.uc.r.appspot.com'
});

export default request;