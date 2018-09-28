import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

/* 组件类 */
import NotFound from '../../components/notFound/NotFound'
import AdminMenu from '../../components/adminMenu/adminMenu'
import AdminIndex from './adminIndex'
import AdminManageUsers from './adminManageUsers'
import AdminManageTags from './adminManageTags'
import AdminManageNewArticle from './adminManageNewArticle'
import AdminManageArticles from './adminManageArticles'
import AdminManageDetail from './adminManageDetail'


/* reducer类*/

export default class Front extends Component() {
    render() {
        /*TODO: 这里的match是哪里来的， 必须使用match来获取url*/
        const {url} = this.props.match;
        if (this.props.userInfo.userType) {
            return (<div>
                {
                    this.props.userInfo.userType === 'admin' ?
                        <div>
                            <div>
                                <AdminMenu/>
                            </div>
                            <div>
                                <Switch>
                                    <Route exact path={url} component={AdminIndex}/>
                                    <Route path={`${url}/manageUsers`} component={AdminManageUsers}/>
                                    <Route path={`${url}/manageTags`} component={AdminManageTags}/>
                                    <Route path={`${url}/manageArticles`} component={AdminManageArticles}/>
                                    <Route path={`${url}/manageNewArticle`} component={AdminManageNewArticle}/>
                                    <Route path={`${url}/manageDetail`} component={AdminManageDetail}/>
                                    <Route component={NotFound}/>
                                </Switch>
                            </div>
                        </div>
                        : <Redirect to="/"/>
                }
            </div>)
        } else {
            return <NotFound/>
        }
    }
}