if(process.env.NODE_ENV !== 'producton'){
    require('dotenv').config();
}


//建立Web 服務
const Express = require('express');
const app = Express();

//新增路由 Middleware(next)
app.get('/', (req, res,next) => {
    console.log('middleware');
    next();
});
//新增路由
app.get('/', (req, res) => {
    res.send('Hello World!');
});


//監聽
app.listen(process.env.PORT, error => {
    if (error) return console.log(error);
    console.log('listen http://localhost:3000');
});