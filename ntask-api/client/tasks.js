const axios = require('axios');

axios.defaults.baseURL = 'http://127.0.0.1:3000';
axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NDd9.AAU7_nm5fZN9L0iGvTibiRwxgDynut89cuQSv15e4cE';

function getTasks() {
    axios.get('/tasks', {}).then(res => {
        console.log('tasks', res.data);
    }).catch(err => {
        console.error(err);
    });
}

function crateTask() {
    axios.post('/tasks', {
        title: 'write api',
        done: false
    }).then(res => {
        console.log(res.data);
    });
}

function getTask() {
    axios.get('/tasks/1')
        .then(res => {
            console.log('task', res.data);
        });
}

function updateTask() {
    axios.put('/tasks/1', {
        title: 'write api',
        done: true
    }).then(res => {
        console.log('task', res.data);
    });
}

getTasks();
// crateTask();
// getTask();
// updateTask();


