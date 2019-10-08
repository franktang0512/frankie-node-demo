//建立Web 服務
const Express = require('express');
const app = Express();

//新增路由
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//監聽
app.listen(3000, error => {
    if (error) return console.log(error);
    console.log('listen http://localhost:3000');
});