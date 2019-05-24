import React from 'react'
import { connect } from 'react-redux'
import { getMsgList, recvMsg } from '../../redux/chat.redux'
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import { Route,Redirect } from 'react-router-dom'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import Msg from '../msg/msg'
import QueueAnim from 'rc-queue-anim'

@connect(
    state => state,
    { getMsgList, recvMsg }
)
class DashBoard extends React.Component {
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }

    render() {
        // state作为this.props的形式传递进来,redux用法
        const user = this.props.user
        const pathname = this.props.location.pathname
        console.log(pathname)
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '打工仔列表',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ];

        const page = navList.find(v => v.path === pathname);

        return page ? (
            <div>
                <NavBar className='fixed-header' mode='dark'>{page.title}</NavBar>
                <div style={{ marginTop: 45 }}>
                    <QueueAnim type='scaleX' duration='800'>
                        <Route key={page.path} path={page.path} component={page.component}/>
                    </QueueAnim>
                </div>
                <NavLinkBar data={navList}/>
            </div>
        ) : <Redirect to='/msg' />
        // :{/*<Redirect to='/login' />*/}
    }
}

export default DashBoard