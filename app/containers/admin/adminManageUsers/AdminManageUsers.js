import PureRenderMixin from 'react-addons-pure-render-mixin'
import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Table, Pagination} from 'antd';
import style from './style.css'

import {actions} from '../../../reducers/adminManageUsers'

const {get_all_users} = actions;

const columns = [{
    title: '姓名',
    dataIndex: 'username',
    key: 'name',
    render: text => <a href="#">{text}</a>,
}, {
    title: 'ID',
    dataIndex: '_id',
    key: 'ID',
}, {
    title: '密码(加密后)',
    dataIndex: 'password',
    key: 'password',
}
    , {
        title: '身份',
        dataIndex: 'type',
        key: 'address',
    }
];

class AdminManageUsers extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        console.log('list',this.props.list)
        return (
            <div>
                <h2>用户管理</h2>
                <Table className={style.table}
                       pagination={false}
                       columns={columns}
                       dataSource={this.props.list}
                />
                <div>
                    <Pagination
                        onChange={(pageNum)=>{
                            this.props.getAllUsers(pageNum)
                        }}
                        current={this.props.pageNum}
                        total={this.props.total}
                    />
                </div>
            </div>
        )
    }

    componentDidMount() {
        //缓存
        /*TODO: 这是什么原理*/
        if(this.props.list.length===0)
            console.log('this.props',this.props)
            this.props.getAllUsers();
    }
}

AdminManageUsers.defaultProps = {
    list: [],
    pageNum: 1,
    total: 0
};

AdminManageUsers.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object),
    pageNum: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
    let {list, pageNum, total} = state.admin.users;
    console.log('state.admin.users',state.admin.users)
    return {
        list,
        pageNum,
        total

    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllUsers: bindActionCreators(get_all_users, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminManageUsers);

