import React, {Component, Proptypes} from 'react';
/*react-router和react-router-dom的引用一个就好，react-router-dom多了Link，BroswerRouter这样的DOM组件*/
import {
    BroswerRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import {connect} from 'react-redux';
import NotFound from '../components/notFound/NotFound';
import Admin from './admin/Admin';
import Front from './front/Front';
import Loading from '../components/loading/Loading';


class AppIndex extends Component() {
    constructor(props){
        super(props);
        this.openNotification = this.openNotification.bind(this)
    }

    openNotification(type,message){
        //利用antd进行状态提示
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
                    {this.props.notification && this.props.notification.content?
                        (this.props.notification.type===1?
                            this.openNotification('success',this.props.notification.content):
                            this.openNotification('error',this.props.notification.content)):null
                    }
                </div>
            </Router>
        )
    }
}

