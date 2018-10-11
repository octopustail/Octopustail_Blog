import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

import {actions} from '../../../reducers/index'

const {user_auth} = actions;

class AdminIndex extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    }

    render() {
        return (
            <div>
                <h1>
                    welcome To My Blog
                </h1>
            </div>
        )
    }
}

AdminIndex.defaulProps = {
    isAdmin: false
};

function mapStateToProps(state) {
    return {
        isAdmin: state.globalState.userInfo.userType === 'admin',
        userInfo: state.globalState.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        user_auth: bindActionCreators(user_auth, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminIndex)