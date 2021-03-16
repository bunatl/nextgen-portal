import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

import { Auth } from 'aws-amplify';

export default function Login() {
    const history = useHistory();
    const onFinish = async (values: any) => {
        try {
            const user = await Auth.signIn(values.email, values.password);
            // to keep user logged
            localStorage.setItem("user", user.username);
            message.success("You have been signed in successfully", 5);
            history.push("/dashboard");
        } catch (error) {
            message.error(error.message, 10);
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
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your login email!',
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    autoComplete="email"
                    placeholder="email"
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