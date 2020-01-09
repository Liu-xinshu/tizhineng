import React, { Component } from 'react'
import Circle from 'sanyuelanv-circle';
import { Menu, Dropdown, Icon, message } from 'antd'
import {connect} from 'dva'
 class Three extends Component {
    state = {
        ind:1,
        cur:'当月',
        menu:(
            <Menu onClick={this.changeind.bind(this)}>
            <Menu.Item key="1">当月</Menu.Item>
            <Menu.Item key="2">上月</Menu.Item>
            </Menu>)
    }
    render() {
        let {ind,cur,menu} = this.state;
        let {data} = this.props;
        return (
            <div>
                <div className="box">
                        <div className="title">
                            <i className="line"></i>考勤分析
                        </div>
                        <div>
                             <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link" href="#">
                                {cur} <Icon type="down" />
                                </a>
                              </Dropdown>
                        </div>
                    </div>
                    <div className="oneCircle">
                        <Circle
                            current={(data&&data.rate)*1}
                            startPoint={0}
                            gradientDirection={"horizontal"}
                            gradient={
                                [
                                    { offset: 0, color: "rgb(255,255,0)", opacity: 1 },
                                    { offset: 50, color: "rgb(255,0,0)", opacity: 1 },
                                ]
                            }
                            radius={70}
                        />
                        <ul>
                            <li><span>出勤    {data&&data.attendance}次</span><span>请假    {data&&data.leave}次</span></li>
                            <li><span>出差    {data&&data.businessTravel}次</span><span>迟到    {data&&data.late}次</span></li>
                            <li><span>外出    {0}小时</span><span>加班    {data&&data.date}小时</span></li>
                        </ul>
                    </div>
            </div>
        )
    }
    changeind({key,item}){
        this.setState({
            cur:item.props.children,
            ind:key
        },()=>{
            this.props.dispatch({
                type:'checkwork/getData',
                month:this.state.ind
            })
        })
    }
    componentDidMount(){
        this.props.dispatch({
            type:'checkwork/getData',
            month:this.state.ind
        })
    }
}
Three = connect(state=>{
    return {
        ...state.checkwork
    }
})(Three)
export default {
    component:Three,
    key:3
}