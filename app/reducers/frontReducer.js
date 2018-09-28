/* actionType */
// admin状态子树的根节点，用于路由跳转？ 可能之后会有react-router有关系
export const actionType = {
    GET_ARTICLE_LIST: 'GET_ARTICLE_LIST',
    RESPONSE_ARTICLE_LIST: 'RESPONSE_ARTICLE_LIST',
    GET_ARTICLE_DETAIL: 'GET_ARTICLE_DETIAL',
    RESPONSE_ARTICLE_DETAIL: 'RESPONSE_ARTICLE_DETIAL',
};

/*initialState*/
const initialState = {
    category: [],
    articleList: [],
    articleDetail: {},
    pageNum: 1,
    total: 0,
}

/* actionCreators*/
/*需要在组件中dispatch actions 主要是请求文章，*/
/*TODO：之后需要关注这一个部分是不是用了saga 怎么使用的saga*/
export const actions = {
    get_article_list: function (tag = '', pageNum = 1) {
        return {
            type: actionType.GET_ARTICLE_LIST,
            tag,
            pageNum
        }
    },
    get_article_Detail: function (id) {
        return {
            type: actionType.GET_ARTICLE_DETAIL,
            id
        }
    }
}

/* reducers */
/*需要在reducer中处理的action是获取到请求得到的数据*/
/*TODO：之后需要关注这一个部分是不是用了saga 怎么使用的saga 这里的传入的action是在哪里分发的，action的内容是什么*/

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionType.RESPONSE_ARTICLE_LIST:
            return {
                ...state,
                articleList:[...action.data.list],
                PageNum:action.data.pageNum,
                total: action.data.total,
            };
        case actionType.RESPONSE_ARTICLE_DETAIL:
            return{
                ...state,
                articleDetail: action.data.articleDetail,
            };
        default:
            return state;
    }
}

