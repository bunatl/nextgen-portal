import { useContext, useEffect } from 'react';
import {
    Form,
    Input,
    Spin,
    Button
} from 'antd';
import { DashboardUsernameContext } from '../../../contexts';
import { compareObjects } from '../../../utils/compareObjects';
import { TOTAL_ANNUAL_LEAVE } from '../../../utils/constants';

import { GET_VACATION_INFO } from '../../../graphql/queries';
import { useQuery } from '@apollo/client';

export default function AnnualLeave() {
    const [ form ] = Form.useForm();
    const { username } = useContext(DashboardUsernameContext);
    const { loading, error, data } = useQuery(GET_VACATION_INFO, { variables: { username } });

    useEffect(() => {
        if (!error && !loading && data)
            form.setFieldsValue({
                currentAnnualLeave: data.getUserFullInfo.annualLeave,
                totalAnnualLeave: TOTAL_ANNUAL_LEAVE.toString(),
                annualLeaveLeft: (TOTAL_ANNUAL_LEAVE - parseInt(data.getUserFullInfo.annualLeave)).toString()
            });
    }, [ loading, error, data, form ]);

    const askToUpdateInfo = () => {
        const diff = compareObjects(data.getUserFullInfo, form.getFieldsValue());
        // use username var to indetify from what user it is comming from
        if (diff.length !== 0) console.log(diff);
    }

    return (
        <Form form={form} id="userAnnualLeaveForm">
            <Spin spinning={loading} delay={500}>
                <h2>Annual leave</h2>
                <Form.Item name={'currentAnnualLeave'} label={'Used days'}>
                    <Input addonAfter={"days"} placeholder={"12"} />
                </Form.Item>
                <Form.Item name={'annualLeaveLeft'} label={'Days left'}>
                    <Input addonAfter={"days"} placeholder={"18"} />
                </Form.Item>
                <Form.Item name={"totalAnnualLeave"} label={'Total annual days'}>
                    <Input addonAfter={"days"} placeholder={"30"} disabled />
                </Form.Item>
            </Spin>
            <Button type="primary" size="large" onClick={askToUpdateInfo} >Ask to update changed information</Button>
        </Form >
    )
}