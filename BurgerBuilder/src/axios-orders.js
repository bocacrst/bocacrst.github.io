import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-d2dae.firebaseio.com/'
});

export default instance;