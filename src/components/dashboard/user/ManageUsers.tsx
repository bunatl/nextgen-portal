import { useState, useEffect, useContext } from 'react';
import {
    Form,
    Input,
    Select,
    Spin,
    Button,
    AutoComplete,
    DatePicker,
    Popconfirm,
    message
} from 'antd';
import { SaveOutlined } from '@ant-design/icons';

import moment from 'moment';

import { IAllUsers } from '../../../types/dashboard'
import { DashboardUsernameContext } from '../ ../../../../contexts';
import { fetchUserFullInfo, fetchAllUsers, putUpdateUserData } from '../../../utils/fetches';

const { TextArea } = Input;
const { Option } = Select;

export default function ManageUsers() {
    const TOTAL_ANNUAL_LEAVE: number = 30;
    const DATE_FORMAT: string = "DD-MMM-YYYY";
    const [ form ] = Form.useForm();
    const [ searchLoading, setSearchLoading ] = useState<boolean>(false);
    const { username } = useContext(DashboardUsernameContext);

    // known issue with getting antd addonBefore value: https://github.com/ant-design/ant-design/issues/18060
    const [ emplType, setEmplType ] = useState<string>('hod');
    const [ options, setOptions ] = useState<any>([]);
    const [ allUsers, setAllUsers ] = useState<IAllUsers[]>([]);

    useEffect(() => {
        updateForm();
        parseAndSetAllUsers();
    }, [])

    const parseAndSetAllUsers = async () => {
        const allUsers = await fetchAllUsers();
        if (allUsers.data && allUsers.data.getAllUsers) {
            setAllUsers(allUsers.data.getAllUsers);
            message.info('List of users is loaded into search autocomplete.', 3)
        }
    }

    const populateFormFields = (userData: any) => {
        form.setFieldsValue({
            username: userData.username,
            name: userData.name,
            currentAddress: userData.currentAddress,
            pernamentAddress: userData.pernamentAddress,
            dob: moment(userData.dob, DATE_FORMAT),
            startDate: moment(userData.startDate, DATE_FORMAT),
            ico: userData.ico,
            bankAccount: userData.bankAccount,
            compensation: userData.compensation,
            currentAnnualLeave: userData.annualLeave,
            totalAnnualLeave: TOTAL_ANNUAL_LEAVE.toString(),
            annualLeaveLeft: (TOTAL_ANNUAL_LEAVE - parseInt(userData.annualLeave)).toString(),
            notes: userData.notes,
        })
        setEmplType(userData.employmentType);
    }

    const updateForm = async (m_username: string = username) => {
        // when the fetch call comming from user search
        if (m_username !== username) setSearchLoading(true);
        // get user data from DynamoDB through lambda function
        const graphqlRes = await fetchUserFullInfo(m_username);
        // if successfull, set the form fields based on the result from DB
        if (graphqlRes.data && graphqlRes.data.getUserFullInfo) {
            const { name, username } = graphqlRes.data.getUserFullInfo;
            populateFormFields(graphqlRes.data.getUserFullInfo);
            message.success(`Data about ${name} (${username}) were successfully displayed.`, 4)
        } else
            message.warning(`While getting data an error has occurred.`, 4)
        // cancel loading animation in search button
        if (m_username !== username) setSearchLoading(false);
    }

    const submitForm = () => {
        const fields = form.getFieldsValue();
        console.log(fields)
        // put data into DynamoDB
        const success = putUpdateUserData(fields, emplType);
        success
            ? message.success('Data were successfully updated.', 3)
            : message.warning('An error has occurred. Please check your data and try again.', 5)
    }

    const contractType = (
        <Select dropdownMatchSelectWidth value={emplType} onChange={(val: string) => setEmplType(val)}>
            <Option value="hod">Hodinová mzda</Option>
            <Option value="md">MD</Option>
            <Option value="fix">Měsíční fix</Option>
        </Select>
    );

    const handleSearch = (value: string) => {
        const suggestedOptions =
            value
                ? allUsers.reduce((acc: any, current: IAllUsers) => {
                    if (current.name.includes(value) || (current.username.includes(value)))
                        acc.push({ value: current.name, label: (<div className="searchSuggestions"><span>{current.name}</span><span>{current.username}</span></div>) });
                    return acc;
                }, [])
                : [];
        setOptions(suggestedOptions)
    };

    const searchForUser = (name: string) => {
        if (name === '') return;
        // match username with user's name
        const user = allUsers.find(user => user.name === name);
        if (user) updateForm(user.username);
    }


    return (
        <Form
            form={form}
            name="userInfo"
            onFinish={submitForm}
        >
            <div id="manageControl">
                <Popconfirm placement="bottomLeft" title={"Are you sure to save user's info?"} onConfirm={submitForm} okText="Yes" cancelText="No">
                    <Button type="primary" icon={<SaveOutlined />} size="large">Save changes</Button>
                </Popconfirm>
                <AutoComplete
                    options={options}
                    onSelect={searchForUser}
                    onSearch={handleSearch}
                >
                    <Input.Search
                        size="large"
                        placeholder="Search user by email or name"
                        allowClear
                        onSearch={searchForUser}
                        enterButton={"Search"}
                        loading={searchLoading}
                    />
                </AutoComplete>
            </div>
            <section>
                <Spin spinning={searchLoading} delay={500}>
                    <h3>Info</h3>
                    <div className={"formSubsection"}>
                        {/* name */}
                        <Form.Item name="name" label="Full name" >
                            <Input placeholder="Please input your nickname" />
                        </Form.Item>
                        {/* dob */}
                        <Form.Item name="dob" label="Date of birth" >
                            <DatePicker format={DATE_FORMAT} />
                        </Form.Item>
                        {/* Pernament address */}
                        <Form.Item name="pernamentAddress" label="Pernament address" >
                            <Input placeholder="Please input your nickname" />
                        </Form.Item>
                    </div>

                    <div className={"formSubsection"}>
                        {/* username */}
                        <Form.Item name="username" label="Username" >
                            <Input placeholder="Please input your nickname" />
                        </Form.Item>
                        {/* start date */}
                        <Form.Item name="startDate" label="Start date" >
                            <DatePicker format={DATE_FORMAT} />
                        </Form.Item>
                        {/* Current address */}
                        <Form.Item name="currentAddress" label="Current address" >
                            <Input />
                        </Form.Item>
                    </div>
                </Spin>
            </section >

            <section className='section2'>
                <Spin spinning={searchLoading} delay={500}>
                    <h3>Finances</h3>
                    <Form.Item name={'ico'} label={'IČO'}>
                        <Input placeholder="01234567" />
                    </Form.Item>

                    <Form.Item name={'compensation'} label={'Employment type'}>
                        <Input
                            addonBefore={contractType}
                            addonAfter="Kč"
                            placeholder="3300"
                        />
                    </Form.Item>

                    <Form.Item name={'bankAccount'} label={'Bank account'}>
                        <Input placeholder="34568795/0300" />
                    </Form.Item>
                </Spin>
            </section>
            <section className='section3'>
                <Spin spinning={searchLoading} delay={500}>
                    <h3>Annual leave</h3>
                    <Form.Item name={'currentAnnualLeave'} label={'Used days'}>
                        <Input addonAfter={"days"} />
                    </Form.Item>
                    <Form.Item name={'annualLeaveLeft'} label={'Days left'}>
                        <Input addonAfter={"days"} />
                    </Form.Item>
                    <Form.Item name={"totalAnnualLeave"} label={'Total annual days'}>
                        <Input addonAfter={"days"} disabled />
                    </Form.Item>
                </Spin>
            </section>

            <section>
                <Spin spinning={searchLoading} delay={500}>
                    <h3>Notes</h3>
                    {/* showCount */}
                    <Form.Item name={'notes'}>
                        <TextArea rows={4} />
                    </Form.Item>
                </Spin>
            </section>
        </Form>
    )
}
