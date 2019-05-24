import axios from 'axios'
import {getRedirectPath} from "../util";
// 登录和注册的action修改的state都是一致的，那么直接用authsuccess代替
// const LOGIN_SUCCESS ='LOGIN_SUCCESS'
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const AUTH_SUCCESS ='AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'

const initState = {
    redirectTo: '',
    // isAuth: false, //是否登陆
    msg: '', // 错误信息
    user: '',
    type: ''
}

// reducer
export function user(state=initState, action) {
    switch(action.type) {
        // case REGISTER_SUCCESS:
        //     return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
        // case LOGIN_SUCCESS:
        //     return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
        case AUTH_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload}
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.payload}
        case LOAD_DATA:
            return {...state, ...action.payload}
        case LOGOUT:
            return {...initState, redirectTo: '/login'}
        default:
            return state
    }
}

export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('用户名密码必须输入')
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            const doRequest = axios.post('/user/login', {user, pwd})
            doRequest.then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    // 这里其实拿到的是后端返回的data字段
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export function register({user, pwd, repeatPwd, type}) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名和密码必须输入')
    }
    if (pwd !== repeatPwd) {
        return errorMsg('两次输入密码不一致')
    }

    // return dispatch => {
    //     axios.post('/user/register', {user, pwd, type})
    //         .then(res => {
    //             if (res.status === 200 && res.data.code === 0) {
    //                 dispatch(registerSuccess({user, pwd, type}))
    //             } else {
    //                 dispatch(errorMsg(res.data.msg))
    //             }
    //         })
    // }

    return dispatch => {
        return new Promise((resolve, reject) => {
            const doRequest = axios.post('/user/register', {user, pwd, type})

            doRequest.then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess({user, pwd, type}))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
                console.log(res)
                resolve(res)
            }).catch(err => {
                console.log(err)
                // 这里一般报网络异常
                reject(err)
            })
        })
    }
}

export function update(data) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const doRequest = axios.post('/user/update', data)
            doRequest.then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export function loadData(data) {
    return {type: LOAD_DATA, payload: data}
}

export function logoutSubmit() {
    return {type: LOGOUT}
}

function authSuccess(obj) {
    // 过滤pwd不展示
    const {pwd, ...data} = obj
    return {type: AUTH_SUCCESS, payload: data}
}

// function loginSuccess(data) {
//     return {type: LOGIN_SUCCESS, payload: data}
// }
//
// function registerSuccess(data) {
//     return {type: REGISTER_SUCCESS, payload: data}
// }

function errorMsg(msg) {
    return {type: ERROR_MSG, payload: msg}
}