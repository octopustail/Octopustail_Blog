import React, {Component, Proptypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {ArticleListCell} from '../articleListCell/ArticleListCell'

export default class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        return (
            <div>
                {
                    this.props.data.map((article, index) => (
                        <ArticleListCell key={index} getArticleDetail={this.props.getArticleDetail}
                                         history={this.props.history} data={article}/>
                    ))
                }
            </div>
        )
    }
}