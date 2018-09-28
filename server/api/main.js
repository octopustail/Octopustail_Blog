import Express from 'express';
const router = Express.Router();

//引入数据库相关Schema
import Users from  '../../models/Users'
/*TODO: 搞清楚这个是干嘛的*/
import {responseClient,md5,MD5_SUFFIX} from '../util'

