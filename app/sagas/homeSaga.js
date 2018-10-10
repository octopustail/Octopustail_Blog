import {put, take, call, fork} from 'redux-saga/effects'
import {get, post} from '../fetch/fetch'
import {actionType as IndexActionType} from '../reducers/index'

export function* login(username, password) {
    yield put({type: IndexActionType})
    try {
        return call(post, 'user/login', username, password)
    } catch (error) {
        yield put({type: IndexActionType.SET_MESSAGE, msgContent: '用户名或密码错误', msgType: 0})
    } finally {
        yield put({type: IndexActionType.FETCH_END})
    }
}

export function* register(data) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(post, '/user/register', data)
    } catch (error) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '注册失败', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END});
    }
}

export function* loginFlow() {
    while (true) {
        let request = yield take(IndexActionType.USER_LOGIN)
        let response = yield call(login, request.data)
        if (response && request === 0) {
            yield put({type: IndexActionType.SET_MESSAGE, msgContent: '登陆成功', msgType: 1})
            yield put({type: IndexActionType.RESPONSE_USER_INFO, data: response.data})
        }
    }
}

export function* registerFlow() {
    while (true) {
        let request = yield take(IndexActionType.USER_REGISTER)
        let response = yield call(register, request.username, request.password)
        if (response && request === 0) {
            yield put({type: IndexActionType.SET_MESSAGE, msgContent: '注册成功', msgType: 1})
            yield put({type: IndexActionType.RESPONSE_USER_INFO, data: response.data})
        }
    }
}

export function* user_auth() {
    while (true) {
        yield take(IndexActionTypes.USER_AUTH);
        try {
            yield put({type: IndexActionTypes.FETCH_START});
            let response = yield call(get, '/user/userInfo');
            if (response && response.code === 0) {
                yield put({type: IndexActionTypes.RESPONSE_USER_INFO, data: response.data})
            }
        } catch (err) {
            console.log(err);
        } finally {
            yield put({type: IndexActionTypes.FETCH_END});
        }
    }
}

/*TODO: 完成saga*/