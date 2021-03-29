import { FC } from 'react';
import {
    Form,
    Input,
    Spin,
    Select
} from 'antd';
import { IFormSection } from '../../../../types/dashboard';

const { Option } = Select;

export const FinancesSection: FC<IFormSection> = ({ dataLoading }) => {
    return (
        <section className='section2'>
            <Spin spinning={dataLoading} delay={500}>
                <h3>Finances</h3>
                <Form.Item name={'ico'} label={'IČO'}>
                    <Input placeholder="03248671" />
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

                <Form.Item name={'bankAccount'} label={'Bank account'}>
                    <Input placeholder="34568795/0300" />
                </Form.Item>
            </Spin>
        </section>
    )
}

export const AnnualLeaveSection: FC<IFormSection> = ({ dataLoading }) => {
    return (
        <section className='section3'>
            <Spin spinning={dataLoading} delay={500}>
                <h3>Annual leave</h3>
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
        </section>
    )
}