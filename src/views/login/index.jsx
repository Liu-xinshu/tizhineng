import React, { Component } from 'react'
import RouterView from '../../router/routerView'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'dva'
import S from './index.scss'
import secret from '@/utils/secret.js'
import { login } from '@/api'
import { message } from 'antd';
class Login extends Component {
  state = {
    uaerName: '',
    password: ''
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, { remember, username: userName, password }) => {
      if (!err) {
        if (remember) {//记住密码
          window.localStorage.userInfo = JSON.stringify({ userName, password: secret.Encrypt(password) });

        } else {
          window.localStorage.removeItem('userInfo');
        }
        login({ userName, userPwd: password }).then(res => {
          if (res.code === 1) {
            message.warning('登陆成功', 2);
            let time = new Date().getTime();
            time = (time / 1000) + 3000;//过期时间为两分钟
            window.localStorage.data = JSON.stringify({ ...res.data, time });
            this.props.history.push('/indexroot/home');
          }
        })
      } else {
        return;
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { userName, password } = this.state;
    return (
      <div className={S.login}>
        <Form onSubmit={this.handleSubmit} className={`login-form ${S.formC}`}>
          <h2 className={S.title}>登陆</h2>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '值不能为空!' }],
              initialValue: userName
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入账号"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码',
                },
                {
                  validator(rule, value, callback) {
                    let reg = /^\w{5,12}$/g;
                    if (!reg.test(value)) return callback('密码字符可以是数字字母下划线长度6-12位');
                    callback()
                  }
                }],
              initialValue: password
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox className={S.check}>记住密码</Checkbox>)}
            <Button type="primary" htmlType="submit" className={`login-form-button ${S.btn}`}>
              登陆
               </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
  componentDidMount() {
    if (window.localStorage.userInfo) {
      let { userName, password } = JSON.parse(window.localStorage.userInfo);
      if (userName && password) {
        this.setState({
          userName,
          password: secret.Decrypt(password)
        })
      }
    }
    if (window.localStorage.data) {
      window.localStorage.removeItem('data');
    }
  }
}
export default connect()(Form.create()(Login))
