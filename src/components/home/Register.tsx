import { useContext } from 'react';
import {
    Form,
    Input,
    Checkbox,
    Modal,
    Button,
} from 'antd';

import { ModalContext } from './Form';
import policy from '../../utils/policy';

export const Register = () => {
    const [ form ] = Form.useForm();
    const { setVisibility } = useContext(ModalContext);

    return (
        <Form
            form={form}
            name="register"
            // onFinish={onFinish}
            initialValues={{
                residence: [ 'zhejiang', 'hangzhou', 'xihu' ],
                prefix: '86',
            }}
            scrollToFirstError
        >
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
                <Input.Password />
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
                <Input.Password />
            </Form.Item>

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
                <Input />
            </Form.Item>

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