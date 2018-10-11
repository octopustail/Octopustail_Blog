import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
    Redirect
} from 'react-router-dom';
import {Pagination} from 'antd'
import {bindActionCreators} from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'


import {actions as frontAction} from '../../app/reducers/frontReducer'

const {get_article_list, get_article_detail} = frontAction;

/*components*/
import ArticleList from './components/articelList/ArticleList'

class Home extends Component {
    constructor(props) {
        super(props);
        /* TODO: 了解一下这个mixin -----用来提升渲染性能，当前props和state和之前的不相同时才渲染*/
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        const tags = this.props;
        /*TODO: 这个难道就是用来保存用户登陆状态的？*/
        localStorage.setItem('userInfo', JSON.stringify(this.props.userInfo));
        return (
            /*TODO: 搞清楚这个判断的逻辑*/
            tags.length > 1 && this.props.match.params.tag && (tags.indexOf(this.props.match.params.tag) === -1 || this.props.location.pathname.lastIndexOf('\/') > 0) ?
                <Redirect to="404"/> :
                <div>
                    <ArticleList
                        history={this.props.history}
                        data={this.props.articleList}
                        getArticleDetail={this.props.get_article_detail}
                    />
                    <div>
                        {/*TODO: onChange的逻辑？*/}
                        <Pagination
                            defaultPageSize={5}
                            onChange={(pageNum) => {
                                this.props.get_article_list(this.props.match.params.tag || '', pageNum)
                            }}
                            current={this.props.pageNum}
                            total={this.props.total}
                        />
                    </div>
                </div>
        )

    }

    componentDidMount() {
        this.props.get_article_list(this.props.match.params.tag || '')
    }
}

Home.defaultProps = {
    userInfo: {},
    pageNum: 1,
    total: 0,
    articleList: []
};

Home.propTypes = {
    pageNum: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    articleList: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        tags: state.admin.tags,
        pageNum: state.front.pageNum,
        total: state.front.total,
        articleList: state.front.articleList,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_article_list: bindActionCreators(get_article_list, dispatch),
        get_article_detail: bindActionCreators(get_article_detail, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)