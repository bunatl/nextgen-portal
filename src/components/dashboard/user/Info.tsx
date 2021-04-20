import { useContext, useEffect } from 'react';
import {
    Form,
    Input,
    Spin,
    DatePicker,
    Button
} from 'antd';
import { DashboardUsernameContext } from '../../../contexts';
import { DATE_FORMAT } from '../../../utils/constants';
import { compareObjects, sendEmail } from '../../../utils/updateUserInfoFunctions'

import { GET_USER_INFO } from '../../../graphql/queries';
import { useQuery } from '@apollo/client';

import moment from 'moment';

const { TextArea } = Input;

export default function Info() {
    const [ form ] = Form.useForm();
    const { username } = useContext(DashboardUsernameContext);
    const { loading, error, data } = useQuery(GET_USER_INFO, { variables: { username } });

    useEffect(() => {
        if (!error && !loading && data)
            form.setFieldsValue({
                username: data.getUserFullInfo.username,
                name: data.getUserFullInfo.name,
                currentAddress: data.getUserFullInfo.currentAddress,
                pernamentAddress: data.getUserFullInfo.pernamentAddress,
                dob: moment(data.getUserFullInfo.dob, DATE_FORMAT),
                startDate: moment(data.getUserFullInfo.startDate, DATE_FORMAT),
                notes: data.getUserFullInfo.notes
            });
    }, [ loading, error, data, form ])

    const askToUpdateInfo = () => {
        const formFields = form.getFieldsValue()
        const updatedData = {
            username: formFields.username,
            name: formFields.name,
            currentAddress: formFields.currentAddress,
            pernamentAddress: formFields.pernamentAddress,
            dob: formFields.dob.format(DATE_FORMAT),
            startDate: formFields.startDate.format(DATE_FORMAT),
            notes: formFields.notes
        }

        const diff = compareObjects(data.getUserFullInfo, updatedData);
        // if any diff is found construct and send email
        if (diff.length !== 0) sendEmail(diff, data.getUserFullInfo, username);
    }

    return (
        <Form form={form} id="userInfoForm">
            <Spin spinning={loading} delay={500}>
                <h2>Info</h2>
                {/* username */}
                <Form.Item name="username" label="Username" >
                    <Input placeholder="john@portalo.com" type="email" />
                </Form.Item>
                {/* name */}
                <Form.Item name="name" label="Full name" >
                    <Input placeholder="John Doe" />
                </Form.Item>
                {/* dob */}
                <Form.Item name="dob" label="Date of birth" >
                    <DatePicker format={DATE_FORMAT} />
                </Form.Item>
                {/* start date */}
                <Form.Item name="startDate" label="Start date" >
                    <DatePicker format={DATE_FORMAT} />
                </Form.Item>
                {/* Current address */}
                <Form.Item name="currentAddress" label="Current address" >
                    <Input placeholder="10 Dowing Street, London, UK" />
                </Form.Item>
                {/* Pernament address */}
                <Form.Item name="pernamentAddress" label="Pernament address" >
                    <Input placeholder="Panska 3, Praha 1, Praha, CZ" />
                </Form.Item>
                {/* showCount */}
                <Form.Item name={'notes'}>
                    <TextArea placeholder={"Info about user."} rows={4} />
                </Form.Item>
            </Spin>
            <Button type="primary" size="large" onClick={askToUpdateInfo} >Ask to update changed information</Button>
        </Form >
    )
}
