if (process.env.NODE_ENV !== 'producton') {
    require('dotenv').config();
}


//建立Web 服務
const Express = require('express');
const { db, User,Post } = require('./models');

const app = Express();

const helmet = require('helmet');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
//設定view engine
app.set('view engine', 'pug')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(helmet());

const path = require('path');
const publicPath = path.join(__dirname, 'public');
app.use(serveStatic(publicPath));

//新增路由 Middleware(next)
app.get('/', (req, res, next) => {
    console.log('middleware');
    next();
});
// //新增路由
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
//加入首頁
app.get('/', async function (req, res) {
    const posts = await Post.findAll({
        order: [['createdAt', 'DESC']]
    });
    res.render('index', { posts });
});
//加入/create/post
app.post('/create/post', async (req, res) => {
    const post = await Post.create(req.body);
    res.redirect('/');
});
app.get('/about', function (req, res) {
    res.render('about');
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