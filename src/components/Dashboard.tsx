// import { Component } from 'react';
import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { Layout } from 'antd';

import { rolesTypes } from '../types/roles';

import { Sidebar } from './dashboard/Sidebar';
import { CustomAntHeader } from './dashboard/Header';
import Footer from './home/Footer';

const { Content } = Layout;


export default function Dashboard() {
    const [ role, setRole ] = useState<rolesTypes>('unset');
    const [ username, setUsername ] = useState<string>('');

    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = async () => {
        const { attributes: { email, profile } } = await Auth.currentUserInfo();
        setUsername(email);
        setRole(profile);
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar userRole={role} />
            <Layout className="site-layout">
                <CustomAntHeader user={username} />
                <Content style={{ margin: '0 16px' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>Bill is a cat.</div>
                </Content>
                <Footer />
            </Layout>
        </Layout>
    );
}
