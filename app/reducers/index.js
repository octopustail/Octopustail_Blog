import {combineReducers} from 'redux';
import admin from './admin'
import {reducer as front} from "./frontReducer";

/**
 *需要保存成全局状态的state的处理
 * 包含：用户登陆信息，错误信息提醒，全局loading
 * 需要结合saga来完成异步请求的功能（只有全局状态的异步处理）*/
/* actionType */

export const actionType = {
    FETCH_START: 'FETCH_START', //开始异步请求
    FETCH_END: 'FETCH_END', //结束异步请求
    USER_LOGIN: 'USER_LOGIN', //用户登陆
    USER_REGISTER: 'USER_REGISTER', //用户注册
    RESPONSE_USER_INFO: 'RESPONSE_USER_INFO', //收到用户登陆信息
    SET_MESSAGE: 'SET_MESSAGE', //设置全局提醒
    USER_AUTH: 'USER_AUTH',  //实现免登陆
};

/*initialState*/
const initialState = {
    isFetching: true,
    msg: {
        type: 1, //0 失败，1 成功
        content: ''
    },
    userInfo: {}
}

/* actionCreators*/
/*需要在组件中dispatch actions 主要是请求文章，*/
/*TODO：之后需要关注这一个部分是不是用了saga 怎么使用的saga*/
export const actions = {
    get_login: function (username, password) {
        return {
            type: actionType.USER_LOGIN,
            username,
            password,
        }
    },
    get_register: function (data) {
        return {
            type: actionType.USER_REGISTER,
            data,
        }
    },
    clear_msg: function () {
        return {
            type: actionType.SET_MESSAGE,
            msgType: 1,
            msgContent: '',
        }
    },
    user_auth: function () {
        return {
            type: actionType.USER_AUTH,
        }
    }
}

/* reducers */

/*TODO：了解这一部分是不是用来处理saga 异步请求结果的 了解isFetching是用在哪里的*/

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionType.FETCH_START:
            return {
                ...state,
                isFetching: true
            };
        case actionType.FETCH_END:
            return {
                ...state,
                isFetching: false,
            };
        case actionType.SET_MESSAGE:
            return {
                ...state,
                isFetching: false,
                msg: {
                    type: action.msgType,
                    content: action.msgContent,
                }
            };
        case actionType.RESPONSE_USER_INFO:
            return {
                ...state,
                userInfo: action.data
            };
        default:
            return state;
    }
}


export default combineReducers({
    front,
    globalState: reducer,
    admin
})