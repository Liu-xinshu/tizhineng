import React, { Component } from 'react'
import Circle from 'sanyuelanv-circle';
import { Menu, Dropdown, Icon, message } from 'antd'
import { connect } from 'dva'
class Four extends Component {
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
                        <i className="line"></i>日报
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
                        current={(Number((data&&data.finish/data.total)))}
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
                        <li><span>已交</span><span>{data&&data.finish}篇</span></li>
                        <li><span>未交</span><span>{data&&data.notFinished}人</span></li>
                        <li><span>成交</span><span>{data&&data.total}篇</span></li>
                    </ul>
                </div>
            </div>
        )
    }
    changeind({ key, item }) {
        this.setState({
            cur: item.props.children,
            ind: key
        }, () => {
            this.props.dispatch({
                type: 'daily/getData',
                month: (new Date()*1).toString()
            })
        })
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'daily/getData',
            time: (new Date()*1).toString()
        })
    }
}
Four = connect(state => {
    return {
        ...state.daily
    }
})(Four)
export default {
    component: Four,
    key: 4
}