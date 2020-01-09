import React, { Component } from 'react'
import { Menu, Dropdown, Icon, message } from 'antd'
import { connect } from 'dva'
 class Five extends Component {
    state={
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
                <div className="box-no-posa">
                    <div className="title">
                        <i className="line"></i>客户（包含下属客户）
                    </div>
                    <div>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="#">
                                {cur} <Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>
                </div>
                <div className="clear">
                    <div className="L f_l">
                        {data&&data.total}
                    </div>
                    <div className="R f_r">
                        <ul>
                            <li><span>客户总数</span> {data&&data.total}家</li>
                            <li><span>新增客户数</span> {data&&data.notFinished}家</li>
                            <li><span>拜访客户数</span> {data&&data.finish}家</li>
                        </ul>

                    </div>
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
                type: 'client/getData',
                month: (new Date()*1).toString()
            })
        })
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'client/getData',
            time: (new Date()*1).toString()
        })
    }
}
Five = connect(state => {
    return {
        ...state.client
    }
})(Five)
export default {
    component:Five,
    key:5
}