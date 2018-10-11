/* adminManageArticles*/
/* actionType */
/* */
export const actionType = {
    ADMIN_GET_ARTICLE_LIST: 'ADMIN_GET_ARTICLE_LIST',
    ADMIN_RESPONSE_ARTICLE_LIST: 'ADMIN_RESPONSE_ARTICLE_LIST',
    ADMIN_EDIT_ARTICLE: 'ADMIN_EDIT_ARTICLE',
    ADMIN_DELETE_ARTICLE: 'ADMIN_DELETE_ARTICLE',
};

/*initialState*/
const initialState = {
    articleList: [],
    pageNum: 1,
    total: 0,
}

/* actionCreators*/
/* TODO： 关注editArticle 和 deleteArticle在组件中的处理 */
export const actions = {
    get_article_list: function (pageNum = 1) {
        return {
            type: actionType.ADMIN_GET_ARTICLE_LIST,
            pageNum
        }
    },
    delete_article: function (id) {
        return {
            type: actionType.ADMIN_DELETE_ARTICLE,
            id
        }
    },
    edit_article: function (id) {
        return {
            type: actionType.ADMIN_EDIT_ARTICLE,
            id
        }
    }

}

/* reducers */
/**/

/*TODO：*/

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionType.ADMIN_RESPONSE_ARTICLE_LIST:
            return {
                ...state,
                articleList: [...action.data.list],
                PageNum: action.data.pageNum,
                total: action.data.total,
            };

        default:
            return state;
    }
}

