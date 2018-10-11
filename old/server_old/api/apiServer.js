import Express from 'express';
import config from '../../config/config';
import mongoose from 'mongoose';

/* TODO：需要了解的中间件 cookieParser session 用于用户免登陆*/
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const port = config.port;

const app = new Express();

/* TODO: 需要了解的中间件用法 */
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('express-react-cookie'));
app.use(session({
    secret: 'express-react-cookie',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 1000 * 30}
}));

//展示页面路由
app.use('/', require('./main'));
//管理页面路由
app.use('/admin',require('./admin'));

/*TODO:bluebird是干什么的*/
mongoose.Promise = require('bluebird');
/* 连接数据库 */
mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/blog`, function (err) {
    if(err){
        console.log(err,'连接数据库失败');
        return;
    }

    console.log('连接数据库成功');
    app.listen(port,function (err) {
        if(err){
            console.log('err',err)
        }else{
            console.info(`===> api server is running at ${config.apiHost}:${config.apiPort}`)
        }
    })

});
