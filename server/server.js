import path  from 'path';
import Express from 'express';
import httpProxy from 'http-proxy';
import connectHistoryApiFallback from 'connect-history-api-fallback';

import config from '../config/config'

const app = new Express();
const port = config.port;

// 静态文件托管
app.use('/', Express.static(path.join(__dirname,'..','build')));
//处理前端路由
app.use('/', connectHistoryApiFallback());

//api代理 关系到api请求的部分，另起一个服务器。在页面服务中做一个代理转发到另一个api server上
//访问/api的时候，HTTPProxy会将我的请求代理到targetUrl上，也就是api服务器。在API server 上我们做一些关于数据库的操作以及对前端传过来数据的操作
app.use('/api',(req,res)=>{
    proxy.web(req, res,{target:targetUrl})
});

const targetUrl =`http://${config.apiHost}:${config.apiPort}`;
const proxy = httpProxy.createProxyServer({
    target:targetUrl
})
