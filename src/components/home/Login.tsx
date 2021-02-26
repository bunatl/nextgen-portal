import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

const axios = require('axios');

export const Login = () => {
    const history = useHistory();

    const onFinish = async (values: any) => {
        try {
            const data = {
                "username": values.username,
                "psswd": values.password,
                "email": "test@test.com"
            }
            // send to server
            const response = await axios.post(`${process.env.REACT_APP_AWS_URL}/beta`, data);
            console.log(response)
            // set user is logged
            localStorage.setItem("user", values.username);
            // set if the should be remembered
            localStorage.setItem("remember", values.remember);
            // redirect to dashboard -> https://stackoverflow.com/questions/60691861/redirect-react-form-component-on-submit-react-router-v5-1
            history.push("/dashboard");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    autoComplete="username"
                    placeholder="Username"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    autoComplete="current-password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item >
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
        </Button>
            </Form.Item>
        </Form>
    )
};