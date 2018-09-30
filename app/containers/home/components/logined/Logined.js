import React from 'react';
import {Button} from 'antd';

export const Logined = (props) => (
    <div>
        <p>欢迎：{props.userInfo.username}</p>
        <p>光临我的博客</p>
        {props.userInfo.userType === 'admin' ?
            <Button onClick={() => {
                props.history.push('/admin')
            }} type="primary">点击进入管理页面</Button> : null}
    </div>
)