/* actionType */
/* TODO:RESOLVE_GET_ALL_USERS是做什么的 */
export const actionType = {
    GET_ALL_USERS:'GET_ALL_USER',
    RESOLVE_GET_ALL_USERS:'RESOLVE_GET_ALL_USERS'
};

/*initialState*/
const initialState = {
    list:[],
    pageNum: 1,
    total: 0,
}

/* actionCreators*/
/*TODO: 这个可能是用来发出异步处理请求*/
export const actions = {
    get_all_users: function (pageNum = 1) {
        return {
            type: actionType.GET_ALL_USERS,
            pageNum
        }
    }
}

/* reducers */
/**/
/*TODO：这个可能是用来处理异步获取的结果*/

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionType.RESOLVE_GET_ALL_USERS:
            return {
                list: action.data.list,
                pageNum:action.data.pageNum,
                total:action.data.total,
            };

        default:
            return state;
    }
}

