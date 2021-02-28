import { useContext } from 'react';
import {
    Form,
    Input,
    Checkbox,
    Modal,
    Button,
    message
} from 'antd';

import { ModalContext } from '../../contexts';
import policy from '../../utils/policy';

const axios = require('axios');

export const Register = () => {
    const [ form ] = Form.useForm();
    const { setVisibility } = useContext(ModalContext);

    const onFinish = async (values: any) => {
        const data = {
            "username": values.username,
            "psswd": values.password,
            "email": values.email
        }
        const response = await axios.post(`${process.env.REACT_APP_AWS_URL}/register`, data);
        response.data.registered
            ? message.success(response.data.body, 5)
            : message.warning(response.data.body, 10)

        form.resetFields();
    }

    return (
        <Form
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item
                name="username"
                label={"username"}
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                        whitespace: true,
                    },
                ]}
            >
                <Input autoComplete="username" />
            </Form.Item>
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password autoComplete="new-password" />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={[ 'password' ]}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            >
                <Input.Password autoComplete="new-password" />
            </Form.Item>
            <Form.Item>
                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                        },
                    ]}
                >
                    <Checkbox>
                        I have read the <span onClick={() => setVisibility(true)}>agreement</span>
                    </Checkbox>
                </Form.Item>
                <ModalBox />
                <Button type="primary" htmlType="submit">
                    Register
            </Button>
            </Form.Item>
        </Form >
    );
};

export const ModalBox = () => {
    const { visibility, setVisibility } = useContext(ModalContext);

    return (
        <Modal
            title="Portalo's Terms &amp; conditions"
            centered
            visible={visibility}
            onOk={() => setVisibility(false)}
            onCancel={() => setVisibility(false)}
            width={1000}
        >
            {/* https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml */}
            <div dangerouslySetInnerHTML={{ __html: policy() }} />;
        </Modal>
    );
};