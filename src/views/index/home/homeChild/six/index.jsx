import React, { Component } from 'react'
import {connect} from 'dva'
import { Menu, Dropdown, Icon, message } from 'antd'
import echarts from 'echarts'
 class Six extends Component {
    state = {
        ind: 1,
        cur: '当月',
        menu: (
            <Menu onClick={this.changeind.bind(this)}>
                <Menu.Item key="1">当月</Menu.Item>
                <Menu.Item key="2">上月</Menu.Item>
            </Menu>)
    }
    render() {
        let { ind, cur, menu } = this.state;
        let { data } = this.props;
        return (
            <div>
                <div className="box">
                    <div className="title">
                        <i className="line"></i>活动数据
                        </div>
                    <div>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="#">
                            {cur} <Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>
                </div>
                <div ref="line" style={{ width: "420px", height: "250px", background: "white", borderRadius: "20px" }}></div>
            </div>
        )
    }
    componentDidMount() {
        let { ind} = this.state;
        this.props.dispatch({
            type:'activedate/getData',
            month:ind
        })
        this.mychart = echarts.init(this.refs.line);
       
    }
    componentWillReceiveProps({data}){
            let volume = data.map(item=>{
                return item.num
            })
            let xName = data.map(item=>{
                return item.time
            })
            
            this.mychart .setOption({
                title: {
                    text: ''
                },
                dataZoom: [
                    {
                        id: 'dataZoomX',
                        type: 'slider',
                        xAxisIndex: [0],
                        filterMode: 'filter'
                    },
                    {
                        id: 'dataZoomY',
                        type: 'slider',
                        yAxisIndex: [0],
                        filterMode: 'empty'
                    }
                ],
                tooltip: {},
                legend: {
                    data:['销量']
                },
                xAxis: {
                    data: xName
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'line',
                    data:volume
                }]
            })
    }
    componentWillUnmount(){
        if(this.mychart)this.mychart.dispose();
    }
    changeind({key,item}){
        this.setState({
            cur:item.props.children,
            ind:key
        },()=>{
            this.props.dispatch({
                type:'activedate/getData',
                month:this.state.ind
            })
        })
    }
}
Six = connect(state=>{
    return {
        ...state.activedate
    }   
})(Six)
export default {
    component:Six,
    key:6
}