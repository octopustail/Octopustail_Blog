import React, {Component, Proptypes} from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ArticleListCell from '../articleListCell/ArticleListCell'

export default class ArticleList extends Component() {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        return (
            <div>
                {
                    this.props.articleList.map((article, index) => (
                        <ArticleListCell key={index} getArticleDetail={this.props.get_article_detail}
                                         history={this.props.history} data={article}/>
                    ))
                }
            </div>
        )
    }
}