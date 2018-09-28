/* actionType */
/* */
export const actionType = {
    UPDATE_TITLE: 'UPDATE_TITLE',
    UPDATE_CONTENT: 'UPDATE_CONTENT',
    UPDATE_TAGS: 'UPDATE_TAGS',
    SAVE_ARTICLE: 'SAVE_ARTICLE',
    SET_ARTICLE_ID: 'SET_ARTICLE_ID',

};

/*initialState*/
const initialState = {
    title: '',
    content: '',
    tags: [],
    id: '',
}

/* actionCreators*/
/* TODO: 考虑一下啊为什么没有saveID的action*/

export const actions = {
    update_title: function (title) {
        return {
            type: actionType.UPDATE_TITLE,
            title,
        }
    },
    update_content: function (content) {
        return {
            type: actionType.UPDATE_CONTENT,
            content
        }
    },
    update_tag: function (tags) {
        return {
            type: actionType.UPDATE_TAGS,
            tags,

        }
    },
    save_article: function (data) {
        return {
            type: actionType.SAVE_ARTICLE,
            data
        }
    }


}

/* reducers */
/**/

/*TODO：考虑一下为什么没有SAVE_ARTICLE的ruducer*/

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionType.UPDATE_TITLE:
            return {
                ...state,
                title: action.title
            };
        case actionType.UPDATE_CONTENT:
            return {
                ...state,
                content: action.content
            };
        case actionType.UPDATE_TAGS:
            return {
                ...state,
                tags: action.tags
            };
        case actionType.SET_ARTICLE_ID:
            return {
                ...state,
                id: action.id
            }
        default:
            return state;
    }
}

