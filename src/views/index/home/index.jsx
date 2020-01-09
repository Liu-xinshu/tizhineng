import React, { Component } from 'react'
import S from './index.css'
import { Calendar, Table } from 'antd';
import columes from '@/config/plan.config.js'
import HomeChildren from "./homeChild";

export default class Home extends Component {
    state = {
        username: '',
        role: '',
        homeChildList:[]
    }
    render() {
        const { username, role, planData,homeChildList} = this.state;
        return (
            <div className={S.home}>
                <div className={`${S.content} clear`}>
                    <div className={`${S.left} f_l`}>
                        <img src={require('@/assets/pic.png')} alt="" />
                        <p>{username}</p>
                        <p>岗位:{role}</p>
                        <p>总积分:2000</p>
                        <p>积分排名:100/2500</p>
                    </div>
                    <div className={`${S.right} f_r`}>
                        <div className="bottomC clear">
                           {
                               homeChildList.map((item,index)=>{
                                   return <item.component key={index}/>
                               })
                           }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        if (!window.localStorage.data) return;
        let userData = JSON.parse(window.localStorage.data);
        this.setState({
            username: userData.userName,
            role: userData.identityName,
            homeChildList:HomeChildren(userData.identityName)
        })
    }
   
}
