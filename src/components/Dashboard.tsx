import {
    useEffect,
    useState,
    Suspense,
    lazy,
    useMemo
} from 'react';
import { Layout, Spin } from 'antd';
import { Auth } from 'aws-amplify';

import { rolesTypes } from '../types/roles';

// components
import Footer from './home/Footer';
import { Sidebar } from './dashboard/Sidebar';
import { DashboardContext } from '../contexts'
import { CustomAntHeader } from './dashboard/Header';

// lazy loading content components
const NewUser = lazy(() => import('./dashboard/user/NewUser'));
const Info = lazy(() => import('./dashboard/user/Info'));
const Vacation = lazy(() => import('./dashboard/user/Vacation'));
const Finances = lazy(() => import('./dashboard/user/Finances'));
const Devices = lazy(() => import('./dashboard/user/Devices'));

const { Content } = Layout;

// the order must follow keys in sider
const modules: any = [
    '', <NewUser />, <Info />, <Vacation />, <Finances />, <Devices />
]

export default function Dashboard() {
    const [ role, setRole ] = useState<rolesTypes>('unset');
    const [ username, setUsername ] = useState<string>('Loading...');
    const [ activeMenuItem, setActiveMenuItem ] = useState<string>('');

    const providerValue = useMemo(() => ({ activeMenuItem, setActiveMenuItem }), [ activeMenuItem, setActiveMenuItem ])

    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = async () => {
        const { attributes: { email, profile } } = await Auth.currentUserInfo();
        setUsername(email);
        setRole(profile);
    }

    return (
        <DashboardContext.Provider value={providerValue}>
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar userRole={role} />
                <Layout className="site-layout">
                    <CustomAntHeader user={username} />
                    <Content style={{ margin: '0 16px' }}>
                        <Suspense fallback={<Spin tip="Loading..." ></Spin>}>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                {modules[ parseInt(activeMenuItem) ]}
                            </div>
                        </Suspense>
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        </DashboardContext.Provider>
    );
}
