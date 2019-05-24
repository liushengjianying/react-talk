import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from "../../redux/user.redux";

@withRouter
@connect(
    null,
    { loadData }
)
class AuthRoute extends React.PureComponent {
    componentDidMount() {
        const publicList = ['/login', '/register']
        const pathname = this.props.location.pathname
        console.log(pathname)
        if (publicList.indexOf(pathname) > -1) {
            return null
        } else {
            // 获取用户信息
            axios.get('/user/info')
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            // 有登陆信息
                            this.props.loadData(res.data.data)
                        } else {
                            this.props.history.push('/login')
                        }
                        console.log(res.data)
                    }
                })
            // 是否登陆 现在的url地址(比如用户信息)，login是不需要跳转
            // 用户的type 身份是boss还是打工仔
            // 用户是否完善信息
        }
    }

    render() {
        return null
    }
}

export default AuthRoute