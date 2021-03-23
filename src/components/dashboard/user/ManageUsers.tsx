import React, { useState, useReducer, useEffect, useContext } from 'react';
import {
    Form,
    Input,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    DatePicker,
    TimePicker,
    InputNumber
} from 'antd';

import { DashboardUsernameContext } from '../ ../../../../contexts';


const { TextArea, Search } = Input;
const { Option } = Select;


// type ReducerActions =
//     | { type: 'SETUSERNAME'; payload: string }
//     | { type: 'SWITCHASIDE'; payload: string }
//     | { type: 'RESET' }

// type ContractType =
//     | 'hod'
//     | 'md'
//     | 'fix'

// interface IformData {
//     username: string;
//     name: string;
//     dob: string;
//     pernamentAddress: string;
//     currentAddress: string;

//     usedLeaveDays: string;

//     ico: string;
//     contractType: ContractType;
//     compensation: string;
//     bankAccount: string;

//     note: string;
// }

// const formaData: IformData = {
//     username: '',
//     name: '',
//     dob: '',
//     pernamentAddress: '',
//     currentAddress: '',
//     usedLeaveDays: '',
//     ico: '',
//     contractType: 'hod',
//     compensation: '',
//     bankAccount: '',
//     note: '',
// }


// const reducer = (state: IformData, action: ReducerActions) => {
//     switch (action.type) {
//         default:
//             return state;
//     }
// }


export default function ManageUsers() {
    const [ form ] = Form.useForm();
    const [ searchLoading, setSearchLoading ] = useState<boolean>(false);
    // const [ formValueus, dispatch ] = useReducer(reducer, formaData);
    const { username } = useContext(DashboardUsernameContext);

    const fetchUserFromDb = (username: string) => {
        try {
            // fetch
        } catch (err) {
            console.error(err);
        }
    }

    const setFormFields = (formData: any) => {
        form.setFieldsValue({
            name: username,
            currentAddress: username,
            pernamentAddress: username,
            // dob: username,
            ico: username,
            bankAccount: username,
            employment: username,
            currentAnnualLeave: username,
            annualLeaveLeft: username,
            notes: username,
        })
    }

    const updateForm = (user: string, fromSearch: boolean = false) => {
        // get user data from DynamoDB through lambda function
        fetchUserFromDb(username);
        // set form fields based on the result from DB
        setFormFields('tst');
    }

    useEffect(() => {
        updateForm(username);
    }, [])

    const submitForm = (e: any) => {
        console.log(e)
        // post values into db
    }

    const contractType = (
        <Select defaultValue="hod">
            <Option value="hod">Hodinová mzda</Option>
            <Option value="md">MD</Option>
            <Option value="fix">Měsíční fix</Option>
        </Select>
    );

    return (
        <Form
            form={form}
            name="userInfo"
            onFinish={submitForm}
        >
            {/* search */}
            <Search placeholder="Search user by email" type="email" enterButton="Search" size="large" onSearch={(input: string) => updateForm(input, true)} loading={searchLoading} />
            <section>
                <h3>Info</h3>
                <div className={"formSubsection"}>
                    {/* name */}
                    <Form.Item name="name" label="Full name" >
                        <Input placeholder="Please input your nickname" disabled />
                    </Form.Item>
                    {/* Pernament address */}
                    <Form.Item name="pernamentAddress" label="Pernament address" >
                        <Input placeholder="Please input your nickname" disabled />
                    </Form.Item>
                </div>

                <div className={"formSubsection"}>
                    {/* dob */}
                    <Form.Item name="dob" label="Date of birth" >
                        <DatePicker format="DD-MMM-YYYY" onChange={(date, dateString) => console.log(date, dateString)} />
                    </Form.Item>
                    {/* Current address */}
                    <Form.Item name="currentAddress" label="Current address" >
                        <Input disabled />
                    </Form.Item>
                </div>
            </section >


            <section style={{ width: "49%", display: "inline-block", marginRight: "2%" }}>
                <h3>Finances</h3>
                <Form.Item name={'ico'} label={'IČO'}>
                    <Input placeholder="01234567" />
                </Form.Item>

                <Form.Item name={'employment'} label={'Employment type'}>
                    <Input
                        addonBefore={contractType}
                        addonAfter="Kč"
                        placeholder="3300"
                    />
                </Form.Item>

                <Form.Item name={'bankAccount'} label={'Bank account'}>
                    <Input placeholder="34568795/0300" />
                </Form.Item>
            </section>
            <section style={{ width: "49%", display: "inline-block" }}>
                <h3>Annual leave</h3>
                <Form.Item name={'currentAnnualLeave'} label={'Used days'}>
                    <Input addonAfter={"days"} defaultValue={"30"} />
                </Form.Item>
                <Form.Item name={'annualLeaveLeft'} label={'Days left'}>
                    <Input addonAfter={"days"} defaultValue={''} />
                </Form.Item>
                <Form.Item label={'Total annual days'}>
                    <Input addonAfter={"days"} defaultValue={"30"} disabled />
                </Form.Item>
            </section>

            <section>
                <h3>Notes</h3>
                {/* showCount */}
                <Form.Item name={'notes'}>
                    <TextArea rows={4} />
                </Form.Item>
            </section>
        </Form>
    )
}
