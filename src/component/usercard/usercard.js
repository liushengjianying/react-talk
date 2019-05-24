import React from 'react'
import { Card, WingBlank } from 'antd-mobile'
import PropTypes from "prop-types";
import {withRouter} from 'react-router-dom'

@withRouter
class UserCard extends React.PureComponent {
    static propTypes = {
        UserList: PropTypes.array.isRequired
    }

    handleClick(v) {
        this.props.history.push(`/chat/${v._id}`)
    }

    render() {
        return (
            <div>
                <WingBlank>
                    {this.props.UserList.map(v => (
                        v.avatar ?
                            (<Card key={v.user} onClick={() => this.handleClick(v)}>
                                <Card.Header
                                    title={v.user}
                                    thumb={require(`../img/${v.avatar}.png`)}
                                    extra={<span>{v.title}</span>}>
                                </Card.Header>
                                <Card.Body>
                                    {v.type === 'boss' ?
                                        <div>公司:{v.company}</div> : null}
                                    {/*这里的 \n 是换行符，根据换行符重新展示*/}
                                    {v.desc.split('\n').map(item => (
                                        <div key={item}>{item}</div>
                                    ))}
                                    {v.type === 'boss' ?
                                    <div>薪资:{v.money}</div> : null}
                                </Card.Body>
                            </Card>) : null
                    ))}
                </WingBlank>
            </div>
        )
    }
}

export default UserCard