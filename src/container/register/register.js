import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WhiteSpace, WingBlank, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from "../../redux/user.redux"
import HighComponent from '../../component/highocomponent/highocomponent'

@connect(
    state=> state.user,
    {register}
)
@HighComponent
class Register extends React.PureComponent {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         user: '',
    //         pwd: '',
    //         repeatPwd: '',
    //         type: 'genius'
    //     }
    // }

    // handleChange(key, val) {
    //     this.setState({
    //         [key]: val
    //     })
    // }

    handleRegister = () => {
        this.props.register(this.props.state)
        console.log(this.props.state)
    }

    componentDidMount() {
        this.props.handleChange('type', 'genius')
    }

    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo ?
                    <Redirect to={this.props.redirectTo} /> : null}
                <Logo />
                {this.props.msg ?
                    <p className='err-msg'>{this.props.msg}</p> : null}
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={v => this.props.handleChange('user', v)}>用户</InputItem>
                        <InputItem
                            type='password'
                            onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
                        <InputItem
                            type='password'
                            onChange={v => this.props.handleChange('repeatPwd', v)}>确认密码</InputItem>
                        <WhiteSpace />
                        <RadioItem
                            onChange={() => this.props.handleChange('type', 'genius')}
                            checked={this.props.state.type === 'genius'}>
                            打工仔
                        </RadioItem>
                        <RadioItem
                            onChange={() => this.props.handleChange('type', 'boss')}
                            checked={this.props.state.type === 'boss'}>
                            boss
                        </RadioItem>
                        <WhiteSpace />
                        <Button type='primary' onClick={this.handleRegister}>注册</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default Register