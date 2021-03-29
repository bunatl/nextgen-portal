import { useContext, useEffect } from 'react';
import {
    Form,
    Input,
    Spin,
    Select,
    Button
} from 'antd';
import { DashboardUsernameContext } from '../../../contexts';
import { compareObjects } from '../../../utils/compareObjects';

import { GET_FINANCIAL_INFO } from '../../../graphql/queries';
import { useQuery } from '@apollo/client';

const { Option } = Select;

export default function Finances() {
    const [ form ] = Form.useForm();
    const { username } = useContext(DashboardUsernameContext);
    const { loading, error, data } = useQuery(GET_FINANCIAL_INFO, { variables: { username } });

    useEffect(() => {
        if (!error && !loading && data)
            form.setFieldsValue({
                ico: data.getUserFullInfo.ico,
                bankAccount: data.getUserFullInfo.bankAccount,
                compensation: data.getUserFullInfo.compensation,
                emplType: data.getUserFullInfo.employmentType,
            });
    }, [ loading, error, data, form ]);

    const askToUpdateInfo = () => {
        const diff = compareObjects(data.getUserFullInfo, form.getFieldsValue());
        // use username var to indetify from what user it is comming from
        if (diff.length !== 0) console.log(diff);
    }

    return (
        <Form form={form} id="userFinancialForm">
            <Spin spinning={loading} delay={500}>
                <h2>Finances</h2>
                <Form.Item name={'ico'} label={'IČO'}>
                    <Input placeholder="03248671" />
                </Form.Item>

                <Form.Item name={'bankAccount'} label={'Bank account'}>
                    <Input placeholder="34568795/0300" />
                </Form.Item>

                <Form.Item label={'Employment type'} >
                    <Form.Item name={'emplType'} style={{ width: "40%", display: "inline-block" }} >
                        <Select dropdownMatchSelectWidth >
                            <Option value="hod">Hodinová mzda</Option>
                            <Option value="md">MD</Option>
                            <Option value="fix">Měsíční fix</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={'compensation'} style={{ width: "60%", display: "inline-block" }}>
                        <Input
                            addonAfter="Kč"
                            placeholder="350"
                        />
                    </Form.Item>
                </Form.Item>
            </Spin>
            <Button type="primary" size="large" onClick={askToUpdateInfo} >Ask to update changed information</Button>
        </Form >
    )
}