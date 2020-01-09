import React, { Component } from 'react'
import { Table } from 'antd';
import columes from '@/config/plan.config.js'
const data = [

    {
        title: "今日计划",
        children: [
            {
                key: 0,
                time: "09:31-11:00",
                kecheng: "体育课",
                yuansuo: "蓝田幼儿园",
                banji: "大班-苗苗班"
            },
            {
                key: 1,
                time: "06:31-10:00",
                kecheng: "体育课",
                yuansuo: "蓝田幼儿园",
                banji: "大班-苗苗班"
            },
            {
                key: 2,
                time: "00:31-1:00",
                kecheng: "体育课",
                yuansuo: "蓝田幼儿园",
                banji: "大班-苗苗班"
            },
            {
                key: 3,
                time: "09:31-11:00",
                kecheng: "体育课",
                yuansuo: "蓝田幼儿园",
                banji: "大班-苗苗班"
            },
            {
                key: 4,
                time: "09:31-11:00",
                kecheng: "体育课",
                yuansuo: "蓝田幼儿园",
                banji: "大班-苗苗班"
            },
            {
                key: 5,
                time: "09:31-11:00",
                kecheng: "体育课",
                yuansuo: "蓝田幼儿园",
                banji: "大班-苗苗班"
            },
        ]
    },
    {
        title: "本周计划",
        children: [
            {
                key: 0,
                time: "06:31-11:00",
                kecheng: "体育课",
                yuansuo: "蓝田幼儿园",
                banji: "小班-苗苗班"
            },
            {
                key: 1,
                time: "06:31-10:00",
                kecheng: "体育课",
                yuansuo: "蓝田幼儿园",
                banji: "大班-苗苗班"
            },
            {
                key: 2,
                time: "00:31-1:00",
                kecheng: "体育课",
                yuansuo: "蓝田幼儿园",
                banji: "大班-苗苗班"
            },
            {
                key: 3,
                time: "09:31-11:00",
                kecheng: "体育课",
                yuansuo: "蓝田幼儿园",
                banji: "大班-苗苗班"
            },
            {
                key: 4,
                time: "09:31-11:00",
                kecheng: "体育课",
                yuansuo: "蓝田幼儿园",
                banji: "大班-苗苗班"
            },
            {
                key: 5,
                time: "09:31-11:00",
                kecheng: "体育课",
                yuansuo: "蓝田幼儿园",
                banji: "大班-苗苗班"
            },
        ]
    },
    {
        title: "综合计划",
        children: [
            {
                key: 0,
                time: "10:31-12:00",
                kecheng: "体育课",
                yuansuo: "蓝田幼儿园",
                banji: "中班-苗苗班"
            },
            {
                key: 1,
                time: "06:31-10:00",
                kecheng: "体育课",
                yuansuo: "蓝田幼儿园",
                banji: "小班-苗苗班"
            },
            {
                key: 2,
                time: "00:31-1:00",
                kecheng: "体育课",
                yuansuo: "蓝田幼儿园",
                banji: "大班-苗苗班"
            },
            {
                key: 3,
                time: "09:31-11:00",
                kecheng: "体育课",
                yuansuo: "蓝田幼儿园",
                banji: "大班-苗苗班"
            },
            {
                key: 4,
                time: "09:31-11:00",
                kecheng: "体育课",
                yuansuo: "蓝田幼儿园",
                banji: "大班-苗苗班"
            },
            {
                key: 5,
                time: "09:31-11:00",
                kecheng: "体育课",
                yuansuo: "蓝田幼儿园",
                banji: "大班-苗苗班"
            },
        ]
    }
]
 class Tow extends Component {
     state = {
        ind: 0,
     }
    render() {
        let {ind} = this.state;
        return (
            <div className="tab f_r tow">
            <ul className="clear">
                {
                    data.map((item, index) => {
                        return <li key={index} className={`f_l ${index === ind ? 'active' : ''}`} onClick={this.changeind.bind(this, index)}>
                                    {item.title}
                         </li>
                    })
                }
            </ul>
            <div className="div">
                <Table dataSource={data[ind].children} columns={columes} width="100%" ellipsis={true} pagination={false}
                    size="small"
                    tableLayout="flex"
                    height="100px"
                />
            </div>
        </div>
        )
    }
    changeind(ind) {
        this.setState({
            ind
        })
    }
}
export default {
    component:Tow,
    key:2
}