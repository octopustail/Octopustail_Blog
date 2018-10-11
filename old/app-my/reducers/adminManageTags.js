/* actionType */
/* 文章分类后台管理 */
export const actionType = {
    GET_ALL_TAGS: 'GET_ALL_TAGS',
    SET_TAGS: 'SET_TAGS',
    DELETE_TAG: 'DELETE_TAG',
    ADD_TAG: 'ADD_TAG',
};

/*initialState*/
const initialState = ['首页'];

/* actionCreators*/

export const actions = {
    get_all_tags: function () {
        return {
            type: actionType.GET_ALL_TAGS,
        }
    },
    delete_tag: function (name) {
        return {
            type: actionType.DELETE_TAG,
            name
        }
    },
    add_tag: function (name) {
        return {
            type: actionType.ADD_TAG,
            name
        }
    }
}

/* reducers */
/**/

/*TODO：考虑一下这一个reducer是用在哪个场景？只是在后台管理中，还是说在blog的首页上也是它*/

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionType.SET_TAGS:
            return ['首页', ...action.data];
        default:
            return state;
    }
}

