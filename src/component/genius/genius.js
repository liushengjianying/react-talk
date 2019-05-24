import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect(
    state => state.chatuser,
    {getUserList}
)

@connect(
    state => state.chatuser,
    {getUserList}
)
class Genius extends React.PureComponent {

    componentDidMount() {
        this.props.getUserList('boss')
    }

    render() {
        return (
            <div>
               <UserCard UserList={this.props.userList} />
            </div>
        )
    }
}

export default Genius