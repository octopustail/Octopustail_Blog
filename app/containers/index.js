import React, {Component, Proptypes} from 'react';
/*react-router和react-router-dom的引用一个就好，react-router-dom多了Link，BroswerRouter这样的DOM组件*/
import {
    BroswerRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';

import NotFound from '../components/notFound/NotFound';
import Admin from './admin/Admin';
import Front from './front/Front';
import {Loading} from '../components/loading/Loading';

import {actions} from '../reducers/index';

const {clear_msg, user_auth} = actions


class AppIndex extends Component() {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.openNotification = this.openNotification.bind(this)
    }

    openNotification(type, message) {
        //利用antd进行状态提示
        /*TODO: 这里为什么要用that？*/
        let that = this;
        notification[type]({
            message: message,
            onClose: () => {
                that.props.clear_msg();
            }
        });
        that.props.clear_msg();
    }

    render() {
        let {isFetching} = this.props;

        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/404" component={NotFound}/>
                        <Route path="/admin" component={Admin}/>
                        <Route component={Front}/>
                    </Switch>
                    {/*全局提示信息放在最外层*/}
                    {isFetching && <Loading/>}
                    {this.props.notification && this.props.notification.content ?
                        (this.props.notification.type === 1 ?
                            this.openNotification('success', this.props.notification.content) :
                            this.openNotification('error', this.props.notification.content)) : null
                    }
                </div>
            </Router>
        )
    }

    componentDidMount() {
        this.props.user_auth();
    }
}

function mapStateToProps(state) {
    return {
        notification: state.globalState.msg,
        isFetching: state.globalState.isFetching,
        userInfo: state.globalState.userInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearMsg: bindActionCreators(clear_msg, dispatch),
        user_auth: bindActionCreators(user_auth, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppIndex)