import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from "../../util"
import QueueAnim from 'rc-queue-anim'
// import io from 'socket.io-client'
// 跨域处理 3000和9093两个端口的手动链接
// const socket  = io('ws://localhost:9093')

@connect(
    state => state,
    { getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: []
        }
    }

    componentDidMount() {
        // socket.on('receiveMsg', (data) => {
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // })
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
        // 获取聊天对象的id，用路由拿
        // const to = this.props.match.params.user
        // this.props.readMsg(to)
    }

    componentWillUnmount() {
        const to = this.props.match.params.user
        this.props.readMsg(to)
    }


    fixCarousel = () => {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }

    submit = () => {
        // socket.emit('sendmsg', {text: this.state.text})
        const from = this.props.user._id
        // 收信息者的id去路由中拿
        const to = this.props.match.params.user
        const msg = this.state.text
        console.log(this.props)
        this.props.sendMsg({ from, to, msg })
        this.setState({
            text: '',
            showEm: false
        })
    }

    render() {
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            // filter是防止有两个空格
            .filter(v => v).map(v => ({ text: v }))
        const Item = List.Item
        console.log(this.props)
        const userid = this.props.match.params.user
        const users = this.props.chat.users
        if (!users[userid]) {
            return null
        }
        const chatid = getChatId(userid, this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid)
        return (
            <div id='chat-page'>
                <NavBar mode='dark'
                        icon={<Icon type='left'/>}
                        onLeftClick={() => this.props.history.goBack()}>
                    {users[userid].name}
                </NavBar>

                <QueueAnim type='left' delay={100}>
                    {chatmsgs.map((item, index) => {
                        const avatar = require(`../img/${users[item.from].avatar}.png`)
                        return item.from === userid ? (
                            <List key={item._id}>
                                <Item thumb={avatar}>{item.Content}</Item>
                            </List>
                        ) : (
                            <List key={item._id}>
                                <Item extra={<img src={avatar}/>} className='chat-me'>{item.Content}</Item>
                            </List>
                        )
                    })}
                </QueueAnim>

                <div className='stick-footer'>
                    <List>
                        <InputItem placeholder='请输入'
                                   value={this.state.text}
                                   onChange={v => {
                                       this.setState({
                                           text: v
                                       })
                                   }}
                                   extra={<div>
                                       <span style={{ marginRight: 15 }}
                                             onClick={() => {
                                                 this.setState({
                                                     showEm: !this.state.showEm
                                                 })
                                                 this.fixCarousel()
                                             }}
                                       >😁</span>
                                       <span onClick={this.submit}>发送</span>
                                   </div>}>
                        </InputItem>
                    </List>
                    {this.state.showEm ?
                        <Grid data={emoji}
                              columnNum={9}
                              carouselMaxRow={4}
                              isCarousel={true}
                              onClick={el => {
                                  this.setState({
                                      text: this.state.text + el.text
                                  })
                                  console.log(el)
                              }}/> : null}
                </div>
            </div>
        )
    }
}

export default Chat