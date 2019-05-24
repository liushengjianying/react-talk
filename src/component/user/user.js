import React from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Modal} from 'antd-mobile'
// 清除cookie用的
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
    state => state.user,
    {logoutSubmit}
)
class User extends React.PureComponent {

    logout = () => {
        // browserCookie.erase('userid')
        const alert = Modal.alert
        alert('注销', '确认退出吗?', [
            {
                text: '注销', onPress: () => {
                    browserCookie.erase('userid')
                    // 手动刷新明显不太好，那就清空redux数据来做跳转
                    // window.location.href = window.location.href
                    this.props.logoutSubmit()
                }
            },
            {text: '取消'}
        ])
    }

    render() {
        console.log(this.props)
        const props = this.props

        return props.avatar ?
            (<div>
                <Result
                    img={<img src={require(`../img/${props.avatar}.png`)}/>}
                    title={props.user}
                    message={props.type === 'boss' ? props.company : null}
                />
                <List renderHeader={() => '简介'}>
                    <List.Item multipleLine>
                        {props.title}
                        {props.desc.split('\n').map(item => (
                            <List.Item.Brief key={item}>{item}</List.Item.Brief>
                        ))}
                        {props.money ? <List.Item.Brief>薪资:{props.money}</List.Item.Brief> : null}
                    </List.Item>
                </List>
                <WhiteSpace/>
                <List>
                    <List.Item onClick={this.logout}>
                        注销
                    </List.Item>
                </List>
            </div>) : <Redirect to={props.redirectTo}/>
    }
}

export default User