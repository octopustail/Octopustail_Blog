import React,{Component} from 'react'
import {Input,Form, Icon,Button} from 'antd'
const FormItem = Form.Item;
import style from './style.css'
// import {post} from "../../../../fetch/fetch";
class RegisterFormCom extends Component{
    constructor(props){
        super(props);
    }

    handleRegister = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.register(values);
            }
        });
    };


    render(){
        const {getFieldDecorator} = this.props.form;
        return(
            <Form onSubmit={this.handleRegister} className={style.formStyle}>
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: '请输入用户名!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Username"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                               placeholder="Password"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('passwordRe', {
                        rules: [{required: true, message: '请输入密码!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                               placeholder="Repeat password"/>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button className={style.loginButton} type="primary" htmlType="submit">
                        注册
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

const RegisterForm = Form.create()(RegisterFormCom);

export default RegisterForm