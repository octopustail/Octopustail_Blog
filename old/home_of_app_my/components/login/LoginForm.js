import React, {Component} from 'react';
import {Input, Form, Icon, Button} from 'antd';

const FormItem = Form.Item;

class LoginFormCom extends Component {
    constructor(props) {
        super(props);
    }
    handleLogin = (e)=>{
        e.preventDefault();
        /*利用antd的form自带的校验方法校验，如果校验成功，就用祖传的login方法（从front哪传过来的）。*/
        this.props.form.validateFields((err,values)=>{
            if(!err){
                this.props.login(values.username,values.password)
            }
        })
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleLogin}>
                /* 用的antd的表单 使用方法见ant文档 */
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: '请输入用户名'}]
                    })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Username"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码'}]
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                               placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">
                        登陆
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const LoginForm = Form.create()(LoginFormCom);

export default LoginForm