import { Form, Row, Col, Input, Button, Icon ,message} from 'antd';
import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'dva'
const arr = [
    'staffName',
    'department',
    'position',
    'tel',
    'address'
]
const arr2 = [
    '姓名',
    '职位',
    '位置',
    '电话',
    '地址'
]
class AdvancedSearchForm extends React.Component {
    getFields() {
        const { getFieldDecorator } = this.props.form;
        const children = [];
        for (let i = 0; i < 5; i++) {
            children.push(
                <Col span={8} key={i} style={{ display:'block'}}>
                    <Form.Item label={`${arr2[i]}`}>
                        {getFieldDecorator(`${arr[i]}`, {
                            rules: [
                                {
                                    required: true,
                                    message: '内容不能为空!',
                                },
                            ],
                        })(<Input placeholder={'请输入'+arr2[i]} />)}
                    </Form.Item>
                </Col>
            );
        }
        return children;
    }

    handleSearch = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if(!err){
                await this.props.dispatch({
                    type:'homeCheck/add',
                    obj:values
                })
                message.warning('添加成功');
                this.props.history.go(-1);
              
            }else{
                return;
            }
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
        this.props.history.go(-1);
    };

    render() {
        return (
            <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                <Row gutter={24}>{this.getFields()}</Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">
                            完成
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                              清空
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);

export default connect(state=>{
    return {...state}
})(WrappedAdvancedSearchForm)