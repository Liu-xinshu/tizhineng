import React, { Component } from 'react'
import RouterView from '../../router/routerView'
import style from '@/index.css'
import { getNavList } from '@/router/routerConfig.js'
import { NavLink } from 'dva/router'
import beforeEach from '@/utils/beforeEach'
export default class extends Component {
    state = {
        username: '',//用户名称
        role: '',//用户角色
        navList: []//导航列表
    }
    render() {
        let {navList,username} = this.state;
        return (
          <div className={style.index}>
            <div className="headC">
                <header className="head">
                    <div className="logo">
                        <img src={require("@/assets/logo.png" )} alt=""/>
                    </div>
                    <nav className="nav">
                        {
                        navList.map((item,index)=>{
                        return <NavLink to={item.path} key={index}>{item.title}</NavLink>
                        })
                        }
                    </nav>
                    <div className="r">
                        <span className="f_l">{username}</span>
                        通知
                    </div>
                </header>
            </div>
            <RouterView routes={this.props.routes} path={this.props.match.path} />
          </div>
        )
    }
    componentDidMount() {console.log(this.props.history)
        this.props.history.listen((n) => {
            beforeEach(this.props.history,this);
        })
        if(!window.localStorage.data)return;
        let userData = JSON.parse(window.localStorage.data);
        this.setState({
            username: userData.userName,
            role: userData.identityName,
            navList: getNavList(userData.limitView)
        })
       
    }
}

