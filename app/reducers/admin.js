import {combineReducers} from 'redux';
import {reducer as articles} from './adminManageArticles';
import {reducer as newArticle} from './adminManageNewArticle';
import {reducer as tags} from './adminManageTags';
import {reducer as users} from './adminManageUsers';




/* actionType */
// admin状态子树的根节点，用于路由跳转？ 可能之后会有react-router有关系
export const actionType = {
    ADMIN_URI_LOCATION: 'ADMIN_URI_LOCATION'
};

/*initialState*/
const initialState = {
    url: "/"
}

/* actionCreators*/
export const actions = {
    change_location_admin: function (url) {
        return {
            type: actionType.ADMIN_URI_LOCATION,
            data: url
        }
    }
}

/* reducers */

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionType.ADMIN_URI_LOCATION:
            return {
                ...state,
                url: action.data
                //url: data    bug：data 是从action里过来的啊喂
            };
        default:
            return state;
    }
}


const admin = combineReducers({
    adminGlobalState: reducer,
    articles,
    users,
    newArticle,
    tags,

});
export default admin;