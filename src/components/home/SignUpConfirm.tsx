import { useState, useContext } from 'react'
import { Modal, Input, message, Button } from 'antd';
import { Auth } from 'aws-amplify';
import { ModalContext } from '../../contexts'

export const SignUpConfirm = () => {
    const { modals, dispatch } = useContext(ModalContext);
    const [ confirmLoading, setConfirmLoading ] = useState<boolean>(false);
    const [ confirmCode, setConfirmCode ] = useState<string>('')

    const auth = async () => {
        setConfirmLoading(true);
        const res = await Auth.confirmSignUp(modals.email, confirmCode);
        setConfirmLoading(false);
        if (res === 'SUCCESS') {
            // clear value
            setConfirmCode('');
            message.success('Your account has been verified.', 3);
            dispatch({ type: 'SETAUTH', payload: false });
        } else
            message.warning('Your account has NOT been verified. Please try again.', 5);
    };

    const handleCancel = () => {
        setConfirmCode('');
        dispatch({ type: 'SETAUTH', payload: false });
    };

    return (
        <Modal
            title="Confirm your account with code from your email"
            visible={modals.auth}
            onCancel={handleCancel}
            confirmLoading={confirmLoading}
            footer={[
                <Button key="back" onClick={handleCancel}>Return</Button>,
                <Button key="submit" type="primary" loading={confirmLoading} onClick={auth}>Send</Button>
            ]}
        >
            <Input addonBefore="Confirmation code" value={confirmCode} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmCode(e.target.value)} />
        </Modal>
    )
}
