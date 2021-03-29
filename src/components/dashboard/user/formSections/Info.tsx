import { FC } from 'react';
import {
    Form,
    Input,
    Spin,
    DatePicker
} from 'antd';
import { IFormSection } from '../../../../types/dashboard';
import { DATE_FORMAT } from '../../../../utils/constants'

export const InfoSection: FC<IFormSection> = ({ dataLoading }) => {
    return (
        <section>
            <Spin spinning={dataLoading} delay={500}>
                <h3>Info</h3>
                <div className={"formSubsection"}>
                    {/* name */}
                    <Form.Item name="name" label="Full name" >
                        <Input placeholder="John Doe" />
                    </Form.Item>
                    {/* dob */}
                    <Form.Item name="dob" label="Date of birth" >
                        <DatePicker format={DATE_FORMAT} />
                    </Form.Item>
                    {/* Pernament address */}
                    <Form.Item name="pernamentAddress" label="Pernament address" >
                        <Input placeholder="Panska 3, Praha 1, Praha, CZ" />
                    </Form.Item>
                </div>

                <div className={"formSubsection"}>
                    {/* username */}
                    <Form.Item name="username" label="Username" >
                        <Input placeholder="john@portalo.com" type="email" />
                    </Form.Item>
                    {/* start date */}
                    <Form.Item name="startDate" label="Start date" >
                        <DatePicker format={DATE_FORMAT} />
                    </Form.Item>
                    {/* Current address */}
                    <Form.Item name="currentAddress" label="Current address" >
                        <Input placeholder="10 Dowing Street, London, UK" />
                    </Form.Item>
                </div>
            </Spin>
        </section >
    )
}