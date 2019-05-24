import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WhiteSpace, WingBlank, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import HighComponent from '../../component/highocomponent/highocomponent'

@connect(
    state => state.user,
    {login}
)
@HighComponent
class Login extends React.PureComponent {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         user: '',
    //         pwd: ''
    //     }
    // }

    register = () => {
        console.log(this.props)
        this.props.history.push('/register')
    }

    handleLogin = () => {
        this.props.login(this.props.state)
    }

    // handleChange(key, val) {
    //     this.setState({
    //         [key]: val
    //     })
    // }

    render() {
        return (
            <div>
                {this.props.redirectTo && this.props.redirectTo !== '/login' ?
                    <Redirect to={this.props.redirectTo}/> : null}
                <Logo />
                <WingBlank>
                    <List>
                        {this.props.msg ?
                            <p className='err-msg'>{this.props.msg}</p> : null}
                        <InputItem
                            onChange={v => this.props.handleChange('user', v)}>用户</InputItem>
                        <InputItem
                            type='password'
                            onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button
                        onClick={this.handleLogin} type='primary'>登陆</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login