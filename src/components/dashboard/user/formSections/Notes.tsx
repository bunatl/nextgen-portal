import { FC } from 'react';
import {
    Form,
    Input,
    Spin
} from 'antd';

import { IFormSection } from '../../../../types/dashboard';

const { TextArea } = Input;

export const NotesSection: FC<IFormSection> = ({ dataLoading }) => {
    return (
        <section>
            <Spin spinning={dataLoading} delay={500} >
                <h3>Notes </h3>
                {/* showCount */}
                <Form.Item name={'notes'}>
                    <TextArea placeholder={"Info about user."} rows={4} />
                </Form.Item>
            </Spin>
        </section>
    )
}