import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    Switch,
    Route
} from 'react-router-dom';

export default class Front extends Component() {
    render() {
        const {url} = this.props.match;
        return (
            <div>
                <div>{/* TODO:Banner*/}
                    {/* TODO: Menu*/}
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
                            {/* TODO:登陆信息*/}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}