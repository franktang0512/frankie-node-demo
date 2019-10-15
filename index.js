if (process.env.NODE_ENV !== 'producton') {
    require('dotenv').config();
}


//建立Web 服務
const Express = require('express');
const { db, User } = require('./models');

const app = Express();

//設定view engine
app.set('view engine', 'pug')


//新增路由 Middleware(next)
app.get('/', (req, res, next) => {
    console.log('middleware');
    next();
});
//新增路由
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/create/user', async (req, res) => {
    const user = await User.create({
        email: 's6323859@hotmail.com',
        password: '123456',
        nickname: 'JerryHong',
        gender: 1,
    });
    res.send(user);
});

app.get('/create/post', async (req, res) => {
    const post = await Post.create({
        title: 'test',
        content: ''
        ,
    });
    res.send(post);
});
app.get('/user', async (req, res) => {
    const user = await User.findOne({
        where: { email: 's6323859@hotmail.com' },
        attributes: ['id', 'nickname', 'gender'],
    });
    res.send(user);
});

//監聽
db.sync({
    force: process.env.NODE_ENV !== 'production'
}).then(() => {
    app.listen(process.env.PORT, error => {
        if (error) return console.log(error);
        console.log('listen http://localhost:3000');
    });
}); 