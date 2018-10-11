import React, {Component} from 'react';
import {Menu} from 'antd';
import style from './style.css'


export default class Menus extends Component {

    constructor(props) {
        super(props)
        this.state = {
            current: this.props.categories[0]
        }
    }

    handleClick(e) {
        if (e.key === '首页') {
            this.props.getArticleList('');
        } else {
            this.props.getArticleList(e.key)
        }

        /* TODO:history.push()做了怎样的操作 */
        let toPath = e.key === '首页' ? '/' : '/' + e.key
        this.setState({
            current: e.key
        });
        this.props.history.push(toPath)
    }

    render() {
        console.log('this.props.categories',this.props.categories);
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={this.state.current}
                model="horizontal"
                className={style.MenuContainer}
            >
                {this.props.categories.map((item, index) => (
                    <Menu.Item key={item}>
                        {item}
                    </Menu.Item>
                ))}
            </Menu>
        )
    }

    /* TODO: history.location.pathname*/
    componentDidMount() {
        this.setState({
            current: this.props.history.location.pathname.replace('\/', '') || '首页'
        })
    }
}
