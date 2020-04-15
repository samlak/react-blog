import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://gorest.co.in/public-api'
});

instance.defaults.headers.common['Authorization'] = 'Bearer 5atH7O1rJtvLviV_S1lUPDhgfXvkFRYj0xne';

export default instance;