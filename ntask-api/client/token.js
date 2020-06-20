const axios = require('axios');

axios.defaults.baseURL = 'http://127.0.0.1:3000';


function getToken() {
    axios.post('/token', {
        email: 'test@mail.com',
        password: '007'
    }).then(res => {
        console.log(res.data);
    }).catch(err => {
        console.error(err);
    });
}

getToken();