import Axios from 'axios'

const request=Axios.create({
    baseURL:'http://localhost:8082'
});

export default request;