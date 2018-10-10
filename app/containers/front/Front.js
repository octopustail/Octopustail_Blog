import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

import {
    Switch,
    Route
} from 'react-router-dom';

import {Home} from '../home';
import Login from "../home/components/login/Login";
import {Logined} from '../home/components/logined/Logined'
import Banner from '../../components/banner/Banner';
import Menus from "../../components/menu/Menus";
import NotFound from '../../components/notFound/NotFound'
import Detail from './detail'

import {actions as frontAction} from '../../reducers/frontReducer';
import {actions as tagAction} from '../../reducers/adminManageTags';
import {actions as IndexAction} from '../../reducers/index'

const {get_all_tags} = tagAction;
const {get_login,get_register} = IndexAction;
const {get_article_list} = frontAction


class Front extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const {url} = this.props.match;
        const {login, register} = this.props;
        return (
            <div>
                <div>
                    <Banner/>
                    <Menus getArticleList={(tag) => this.props.get_article_list(tag, 1)}
                           categories={this.props.categories} history={this.props.history}/>
                </div>
                <div>
                    <div>
                        <div>
                            <Switch>
                                {/* exact 用于精确匹配*/}
                                <Route exact path={url} component={Home}/>
                                <Route path={`/detail/:id`} component={Detail}/>
                                <Route path={`/:tag`} component={Home}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </div>
                        <div>
                            {/* TODO:history似乎是和路由相关*/}
                            {this.props.userInfo.userId ?
                                <Logined history={this.props.history} userInfo={this.props.userInfo}/>
                                : <Login login={login} register={register}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.get_all_tags()
    }
}

Front.defaultProps = {
    categories: []
};

Front.propType = {
    categories: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        categories: state.admin.tags,
        userInfo: state.globalState.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_all_tags: bindActionCreators(get_all_tags, dispatch),
        get_article_list: bindActionCreators(get_article_list, dispatch),
        login: bindActionCreators(get_login, dispatch),
        register: bindActionCreators(get_register, dispatch),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Front)
