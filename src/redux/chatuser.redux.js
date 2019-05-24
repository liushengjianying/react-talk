import axios from "axios/index";

const USER_LIST = 'USER_LIST'

const initState = {
    userList: []
}

// reducer
export function chatuser(state = initState, action) {
    switch (action.type) {
        case USER_LIST:
            return {...state, userList: action.payload}
        default:
            return state
    }
}

// export function getUserList(type){
//     return  dispatch=>{
//         axios.get('/user/list?type='+type)
//             .then(res=> {
//                 if (res.data.code === 0) {
//                     dispatch(userList(res.data.data))
//                 }
//             })
//     }
// }

export function getUserList(type) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get('/user/list?type=' + type)
                .then(res => {
                    if (res.data.code === 0) {
                        dispatch(userList(res.data.data))
                    }
                    console.log(this.state)
                    resolve(res.data)
                }).catch(err => {
                reject(err)
            })
        })
    }
}

function userList(data) {
    return {type: USER_LIST, payload: data}
}