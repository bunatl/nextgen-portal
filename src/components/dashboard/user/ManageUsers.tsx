import { useState, useEffect } from 'react';
import {
    Form,
    Input,
    Button,
    AutoComplete,
    Popconfirm,
    message
} from 'antd';
import { SaveOutlined } from '@ant-design/icons';

import moment from 'moment';

import { IAllUsers } from '../../../types/dashboard';
import { DATE_FORMAT, TOTAL_ANNUAL_LEAVE } from '../../../utils/constants'

import { InfoSection } from './formSections/Info'
import { FinancesSection, AnnualLeaveSection } from './formSections/MiddleRow'
import { NotesSection } from './formSections/Notes'

import {
    UPDATE_USER_DATA,
    GET_USER_FULL_INFO,
    ALL_USERS_QUERY
} from '../../../graphql/queries';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';

export default function ManageUsers() {
    const [ form ] = Form.useForm();
    const [ options, setOptions ] = useState<any>([]);
    // graphql queries
    const { data, loading: allUserLoading } = useQuery(ALL_USERS_QUERY);
    const [ updateData, { error: err } ] = useMutation(UPDATE_USER_DATA);
    const [ getUserInfo, { data: userInfoData, loading, error } ] = useLazyQuery(GET_USER_FULL_INFO);

    useEffect(() => {
        if (error) message.warning(`While getting data an error has occurred.`, 4)
        if (!loading && userInfoData)
            form.setFieldsValue({
                username: userInfoData.getUserFullInfo.username,
                name: userInfoData.getUserFullInfo.name,
                currentAddress: userInfoData.getUserFullInfo.currentAddress,
                pernamentAddress: userInfoData.getUserFullInfo.pernamentAddress,
                dob: moment(userInfoData.getUserFullInfo.dob, DATE_FORMAT),
                startDate: moment(userInfoData.getUserFullInfo.startDate, DATE_FORMAT),
                ico: userInfoData.getUserFullInfo.ico,
                bankAccount: userInfoData.getUserFullInfo.bankAccount,
                compensation: userInfoData.getUserFullInfo.compensation,
                emplType: userInfoData.getUserFullInfo.employmentType,
                currentAnnualLeave: userInfoData.getUserFullInfo.annualLeave,
                totalAnnualLeave: TOTAL_ANNUAL_LEAVE.toString(),
                annualLeaveLeft: (TOTAL_ANNUAL_LEAVE - parseInt(userInfoData.getUserFullInfo.annualLeave)).toString(),
                notes: userInfoData.getUserFullInfo.notes
            });
    }, [ userInfoData, loading, error, form ])

    const updateForm = async (name: string) => {
        if (name === '') return;
        let searchedUsername = '';
        // check if incoming name is a username(email)
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(name)) searchedUsername = name;
        else {
            const user = data.getAllUsers.find((user: IAllUsers) => user.name === name);
            searchedUsername = user.username;
        }
        getUserInfo({ variables: { username: searchedUsername } });
    };

    const submitForm = () => {
        const fields = form.getFieldsValue();
        updateData({
            variables: {
                userData: {
                    username: fields.username ? fields.username : '',
                    name: fields.name ? fields.name : '',
                    currentAddress: fields.currentAddress ? fields.currentAddress : '',
                    pernamentAddress: fields.pernamentAddress ? fields.pernamentAddress : '',
                    dob: fields.dob ? fields.dob.format(DATE_FORMAT) : "01-Jan-2000",
                    startDate: fields.startDate ? fields.startDate.format(DATE_FORMAT) : "01-Jan-2000",
                    ico: fields.ico ? fields.ico : '',
                    bankAccount: fields.bankAccount ? fields.bankAccount : '',
                    compensation: fields.compensation ? fields.compensation : '',
                    employmentType: fields.emplType ? fields.emplType : '',
                    annualLeave: fields.currentAnnualLeave ? fields.currentAnnualLeave : '',
                    notes: fields.notes ? fields.notes : ''
                }
            }
        });
        if (err) message.warning('An error has occurred. Please check your data and try again.', 5);
        message.success('Data were successfully updated.', 3);
    }

    const handleSearch = (value: string) => {
        // if all user havent been fetched no autocomplete options
        if (allUserLoading) return;
        setOptions(data.getAllUsers.reduce((acc: any, current: IAllUsers) => {
            if (current.name.toLowerCase().includes(value.toLowerCase()) || (current.username.toLowerCase().includes(value.toLowerCase())))
                acc.push({ value: current.name, label: (<div className="searchSuggestions"><span>{current.name}</span><span>{current.username}</span></div>) });
            return acc;
        }, []))
    };

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
                    onSelect={updateForm}
                    onSearch={handleSearch}
                >
                    <Input.Search
                        size="large"
                        placeholder="Search user by email or name"
                        allowClear
                        onSearch={updateForm}
                        enterButton={"Search"}
                        loading={loading}
                    />
                </AutoComplete>
            </div>
            <InfoSection dataLoading={loading} />
            <FinancesSection dataLoading={loading} />
            <AnnualLeaveSection dataLoading={loading} />
            <NotesSection dataLoading={loading} />
        </Form>
    )
}
