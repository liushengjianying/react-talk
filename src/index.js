import React from 'react';
import ReactDOM from 'react-dom';

// applyMiddleware用来处理异步的redux请求，dispatch就可以传递函数了
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
// import {counter} from './index.redux'
import reducers from './reducers'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './config'
import AuthRoute from './component/auth/auth'
import DashBoard from './component/dashboard/dashboard'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Register from "./container/register/register"
import Login from "./container/login/login"
import Chat from "./component/chat/chat"
import './index.css'

// redux状态调试工具


// 新建store
// 通过reducer创建
// 通过老的state,这里默认为0，和action 生成新的状态
// function counter(state = 0, action) {
//     switch (action.type) {
//         case '加机关枪':
//             return state + 1
//         case '减机关枪':
//             return state - 1
//         default:
//             return 10
//     }
// }
// compose 组合函数


const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))

// const init = store.getState()
//
// console.log(init)

// function listener() {
//     const current = store.getState()
//     console.log(`现在机关枪${current}把`)
// }

// 订阅
// store.subscribe(listener)

// 派发事件,传递action
// store.dispatch({type: '加机关枪'})
// console.log(store.getState())

// function render() {
//     ReactDOM.render(<App store={store} addGUN={addGUN} addGunAsync={addGunAsync}/>, document.getElementById('root'));
// }
// render()
//
// store.subscribe(render)
// console.log(store.getState())

// ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

// class Test extends React.PureComponent{
//     render() {
//         console.log(this.props)
//         return <h2>测试 {this.props.match.params.location}</h2>
//     }
//  }


// 用了react-redux的写法，用provider这个外部接口
// 不写path的话，一个路由都不命中就会进入dashboard,因为switch下面只会命中第一个匹配的路由
ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    {/*<Route path='' component={Login} />*/}
                    <Route path='/bossinfo' component={BossInfo} />
                    <Route path='/geniusinfo' component={GeniusInfo} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/chat/:user' component={Chat} />
                    <Route component={DashBoard} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);