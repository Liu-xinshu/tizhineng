import React, { Component } from 'react'
import style from './index.css'
import { Button, Table, Divider, Tag, Pagination, Upload, icon, Icon, Spin, Alert } from 'antd';
import { connect } from 'dva'
import { columen } from '@/config/management.columns.js'
import { changeConfirmLocale } from 'antd/lib/modal/locale';
import { stat } from 'fs';
class Manageement extends Component {
    state = {
        list: [
            {
                title: '档案管理'
            },
            {
                title: '分配管理'
            },

        ],
        ind: 0,
        IdArr: []
    }
    render() {
        let { list, ind } = this.state;
        let { data, size, limit } = this.props;
        let flag = this.props.effects['homeCheck/fetch']
        return (
            <div className={style.box}>
                <div className={`f_l ` + style.left}>
                    {
                        list.map((item, index) => {
                            return <p key={index} className={ind === index ? 'active' : ''} onClick={this.changeInd.bind(this, index)}>{item.title}</p>
                        })
                    }
                </div>
                <div className={`f_l ` + style.right}>
                    <h3>{list[ind].title}</h3>
                    <div className="search">
                        <input type="text" placeholder="输入姓名或手机号查询" /> <Button type="primary" size="small">查询</Button>
                    </div>
                    <div className="btnC">
                        <Button type="primary" onClick={this.changeRouter.bind(this)}>新增</Button>
                        <Button type="primary" onClick={this.deleteData.bind(this)}>删除</Button>
                        <Button type="primary" onClick={this.exportPart.bind(this)}>导出</Button>                       
                        <Upload accept={'xlsx'}
                            showUploadList={false}
                            customRequest={this.changefile.bind(this)}
                        >
                            <Button type="primary">导入</Button>
                        </Upload>
                        <Button type="primary" onClick={this.downloadFn.bind(this)}>下载初始模板</Button>
                    </div>
                    <div className="tableC">
                        <Spin tip="加载中..."
                            spinning={flag}
                            style={{ display: "block", margin: "0 auto" }}
                            size="large"
                        >
                        </Spin>
                        <Table dataSource={data} columns={columen} rowSelection={this.rowSelection} rowKey={record=>record.id} />
                        <Pagination defaultCurrent={1} total={size} pageSize={limit} onChange={this.changePage.bind(this)} />
                    </div>
                </div>
            </div>
        )
    }
    changeInd(ind) {
        this.setState({ ind })
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'homeCheck/fetch'
        })
    }
    downloadFn() {
        let res = this.props.dispatch({
            type: 'homeCheck/download'
        });
    }
    changePage(pageid) {
        this.props.dispatch({
            type: "homeCheck/changePageid",
            pageid
        })
        setTimeout(() => this.props.dispatch({
            type: 'homeCheck/fetch'
        }), 0)
    }
    changefile(e) {
        let FormData = new window.FormData();
        FormData.append('file', e.file)
        this.props.dispatch({
            type: 'homeCheck/changefile',
            FormData

        })

    }
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            let IdArr = selectedRows.map(item => item.id);
            this.setState({ IdArr })
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    }
    deleteData() {
        let { IdArr } = this.state;
        this.props.dispatch({
            type: "homeCheck/del",
            id: IdArr
        })
    }
    changeRouter() {
        this.props.history.push('/indexroot/addtab');
    }
    exportPart() {
        let { IdArr } = this.state;
        this.props.dispatch({
            type: "homeCheck/exportPART",
            data: IdArr
        })
    }
}
export default connect(
    state => {
        return {
            ...state.homeCheck,
            ...state.loading
        }
    }
)(Manageement)


