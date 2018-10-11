import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'

/* 组件类 */
import NotFound from '../../components/notFound/NotFound'
import AdminMenu from '../../components/adminMenu/adminMenu'
import AdminIndex from './adminIndex/AdminIndex'
import AdminManageUsers from './adminManageUsers/AdminManageUsers'
import AdminManageTags from './adminManageTags/AdminManageTags'
import AdminManageNewArticle from './adminManageNewArticle/AdminManageNewArticle'
import AdminManageArticles from './adminManageArticles/AdminManageArticles'
import AdminManageDetail from './adminManageDetail/AdminManageDetail'


/* reducer类*/
import {actions} from '../../reducers/admin'

const {change_location_admin} = actions

class Admin extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        /*TODO: 这里的match是哪里来的， 必须使用match来获取url*/
        const {url} = this.props.match;
        if (this.props.userInfo && this.props.userInfo.userType) {
            return (<div>
                {
                    this.props.userInfo.userType === 'admin' ?
                        <div>
                            <div>
                                <AdminMenu
                                    history={this.props.history}
                                    url={this.props.adminUrl}
                                    changeUrl={this.props.change_location_admin}
                                />
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

    componentWillReceiveProps() {
        this.props.change_location_admin(window.location.pathname.replace(/\/admin/, "") || '/');
    }
}

Admin.defaultProps = {
    adminUrl: '/'
};

Admin.propTypes = {
    adminUrl: PropTypes.string,
    change_location_admin: PropTypes.func,
};

function mapStateToProps(state) {
    const url = state.admin.adminGlobalState
    return {
        adminUrl: url,
        userInfo: state.globalState.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        change_location_admin: bindActionCreators(change_location_admin, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)