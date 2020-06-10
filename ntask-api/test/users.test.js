const axios = require('axios');

axios.defaults.baseURL = 'http://127.0.0.1:3000';
axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.Kk5syPXQQ0J9UkeRjf-Vwtujs5OMP7hf2tu8BKZRsLY';

function createUser() {
    axios.post('/users', {
        name: 'test',
        password: '007',
        email: 'test@mail.com'
    }).then(res => {
        console.log(res.data);
    }).catch(err => {
        console.error(err);
    });
}

function getUser() {
    axios.get('/user')
        .then(res => {
            console.log('user', res.data);
        });
}

function delUser() {
    axios.delete('/user')
        .then(res => {
            console.log('user', res.data);
        });
}

// getUser();