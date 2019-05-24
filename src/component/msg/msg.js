import React from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

@connect(
    state => state
)
class Msg extends React.PureComponent {
    getLast = (arr) => {
        return arr[arr.length - 1]
    }

    render() {
        console.log(this.props)
        const Item = List.Item
        const Brief = Item.Brief
        // 当前登陆的用户id
        const userid = this.props.user._id
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        console.log(msgGroup)
        // 按照是时间从大到小排序是为了让最后发信息的人顶到页面最上面
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            return b_last - a_last
        })
        console.log(chatList)
        // 按照聊天用户分组，根据chatid，两个人的聊天是from和to拼接而成的唯一id,也就是chatid
        return (
            <div>
                {chatList.map(v => {
                    const lastItem = this.getLast(v)
                    const targetID = v[0].from === userid ? v[0].to : v[0].from
                    const unread = v.filter(v => (!v.read && v.to === userid)).length
                    console.log(unread)
                    if (!this.props.chat.users[targetID]) {
                        return null
                    }
                    return (
                        <List key={lastItem._id}>
                            <Item
                                extra={<Badge text={unread} />}
                                thumb={require(`../img/${this.props.chat.users[targetID].avatar}.png`)}
                            arrow='horizontal'
                            onClick={() => {
                                this.props.history.push(`/chat/${targetID}`)
                            }}>
                                {lastItem.Content}
                                <Brief>
                                    {this.props.chat.users[targetID].name}
                                </Brief>
                            </Item>
                        </List>
                    )
                })}
            </div>
        )
    }
}

export default Msg