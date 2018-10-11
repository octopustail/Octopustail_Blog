import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

import {ManageArticleCell} from './AdminManageArticleCell'

import {actions} from '../../../reducers/adminManageArticles'
const {get_article_list, delete_article, edit_article} = actions

class AdminManageArticles extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
    }

    render() {
        return (
            <div>
                <h2>文章管理</h2>
                <div>
                    {
                        /*TODO: 这里的articleList是从哪里传过来的？*/
                        this.props.articleList.map((item, index) => (
                            <ManageArticleCell
                                editArticle={this.props.edit_article(id)}
                                history={this.props.history}
                                getArticleDetail={this.props.get_article_detail(id)}
                                delete={(id) => this.props.delete_article(id)}
                                key={index} data={item}
                            />
                        ))
                    }
                </div>
                <div>
                    <Pagination
                        defaultPageSize={5}
                        onChange={(pageNum) => {
                            this.props.get_article_list(pageNum)
                        }}
                        current={this.props.pageNum}
                        total={this.props.total}
                    />

                </div>
            </div>
        )
    }

    componentDidMount() {
        if (this.props.articleList.length === 0) {
            this.props.get_article_list()
        }
    }
}

AdminManageArticles.defaultProps = {
    articleList: [],
    pageNum: 1,
    total: 0
};

AdminManageArticles.propTypes = {
    articleList: PropTypes.array,
    pageNum: PropTypes.number,
    total: PropTypes.number,
};

function mapStateToProps(state) {
    return {
        articleList: state.admin.articles.articleList,
        pageNum: state.admin.articles.pageNum,
        total: state.admin.articles.total,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_article_list: bindActionCreators(get_article_list, dispatch),
        delete_article: bindActionCreators(delete_article, dispatch),
        edit_article: bindActionCreators(edit_article, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminManageArticles)