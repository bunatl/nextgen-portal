import { useContext, useState } from 'react';
import {
    Form,
    Input,
    Checkbox,
    Modal,
    Button,
    message
} from 'antd';

import { Auth } from 'aws-amplify';
import { SignUpConfirm } from './SignUpConfirm';
import { ModalContext } from '../../contexts';
import { rolesTypes } from '../../types/roles'
import policy from '../../utils/policy';

export default function Register() {
    const [ form ] = Form.useForm();
    const { dispatch } = useContext(ModalContext);
    const [ masterPsswdVisibility, setMasterPsswdVisibility ] = useState<boolean>(false);
    const [ adminAccount, setAdminAccount ] = useState<rolesTypes>('user');

    const onFinish = async (values: any) => {
        // amplify
        try {
            const { user, userConfirmed } = await Auth.signUp({
                username: values.email,
                password: values.password,
                attributes: {
                    profile: adminAccount,
                    // https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js#confirm-sign-up
                    // other custom attributes 
                    // 'custom:role': adminAccount
                }
            });
            message.success(`User ${user.getUsername()} has been created`, 3)
                .then(() => !userConfirmed ? message.warning('Please confirm your account.', 5) : '')
            // reset account type
            setAdminAccount('user');
            // set reduder for auth modal
            dispatch({ type: 'SETEMAIL', payload: values.email });
            dispatch({ type: 'SETAUTH', payload: true });
            form.resetFields();
        } catch (error) {
            message.error(error.message, 10);
        }
    }

    return (
        <Form
            form={form}
            name="register"
            onFinish={onFinish}
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
                    { required: true, message: 'Please input your password!', },
                    { min: 6, message: 'Password lenght must be at least 6 characters long', },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (/\d+/g.test(value))
                                return Promise.resolve();

                            return Promise.reject('Password must contain at least one digit!');
                        },
                    }),
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
                    I have read the <span onClick={() => dispatch({ type: 'SETTERMS', payload: true })}>agreement</span>
                </Checkbox>
            </Form.Item>

            <Form.Item
                name="adminRole"
                valuePropName="checked"
            >
                <Checkbox onChange={() => setMasterPsswdVisibility(!masterPsswdVisibility)}>
                    Give the account admin privileges
                    </Checkbox>
            </Form.Item>

            {masterPsswdVisibility ? <Form.Item
                name="masterPassword"
                label={"masterpassword"}
                hasFeedback
                rules={[
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('masterPassword') === process.env.REACT_APP_MASTER_PASSWORD) {
                                setAdminAccount('admin');
                                return Promise.resolve();
                            }

                            return Promise.reject('This is not correct master password');
                        },
                    }),
                ]}
            >
                <Input.Password autoComplete="master-password" />
            </Form.Item>
                : ''}
            <Button type="primary" htmlType="submit">Register</Button><br />
            Do you need confirm your account? <a href="#!" onClick={() => dispatch({ type: 'SETAUTH', payload: true })}><b>Click here.</b></a>
            <ModalBox />
            <SignUpConfirm />
        </Form >
    );
};

export const ModalBox = () => {
    const { modals, dispatch } = useContext(ModalContext);

    return (
        <Modal
            title="Portalo's Terms &amp; conditions"
            centered
            visible={modals.terms}
            onOk={() => dispatch({ type: 'SETTERMS', payload: false })}
            onCancel={() => dispatch({ type: 'SETTERMS', payload: false })}
            width={1000}
        >
            {/* https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml */}
            <div dangerouslySetInnerHTML={{ __html: policy() }} />;
        </Modal>
    );
};