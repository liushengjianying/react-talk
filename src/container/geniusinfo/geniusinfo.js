import React from 'react'
import {NavBar, Icon, InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelect from '../../component/avatar/avatarSelect'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
    state => state.user,
    {update}
)
class GeniusInfo extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            title:'',
            desc:''
        }
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    selectAvatar = (imgname) => {
        this.setState({
            avatar: imgname
        })
    }

    render() {
        const path = this.props.location.pathname
        const redirectTo = this.props.redirectTo
        return (
            <div>
                {redirectTo && redirectTo !== path
                    ? <Redirect to={redirectTo} /> : null}
                <NavBar
                    leftContent='Back'
                    mode='dark'
                    rightContent={[
                        <Icon key='0' type='search' style={{marginRight: '16px'}}/>,
                        <Icon key='1' type='ellipsis'/>]}>
                    打工仔完善信息
                </NavBar>
                <AvatarSelect selectAvatar={this.selectAvatar} />
                <InputItem onChange={v => this.handleChange('title', v)}>求职岗位</InputItem>
                <TextareaItem
                    autoHeight={true}
                    title='个人简介'
                    onChange={v => this.handleChange('desc', v)} />
                <Button onClick={() => this.props.update(this.state)} type='primary'>保存</Button>
            </div>
        )
    }
}

export default GeniusInfo