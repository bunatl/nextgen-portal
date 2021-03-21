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
import { DashboardMenuContext } from '../contexts'
import { DashboardUsernameContext } from '../contexts'

// components
import { CustomAntHeader } from './dashboard/Header';
import { Sidebar } from './dashboard/Sidebar';
import Footer from './home/Footer';

// lazy loading content components
const ManageUsers = lazy(() => import('./dashboard/user/ManageUsers'));
const Info = lazy(() => import('./dashboard/user/Info'));
const AnnualLeave = lazy(() => import('./dashboard/user/AnnualLeave'));
const Finances = lazy(() => import('./dashboard/user/Finances'));
const Devices = lazy(() => import('./dashboard/user/Devices'));

const { Content } = Layout;

// the order must follow keys in sider
const modules: any = [
    '', <ManageUsers />, <Info />, <Finances />, <AnnualLeave />, <Devices />
]

export default function Dashboard() {
    const [ role, setRole ] = useState<rolesTypes>('unset');
    const [ username, setUsername ] = useState<string>('Loading...');
    const [ activeMenuItem, setActiveMenuItem ] = useState<string>('');

    const providerValueUsername = useMemo(() => ({ username, setUsername }), [ username, setUsername ])
    const providerValueMenuItem = useMemo(() => ({ activeMenuItem, setActiveMenuItem }), [ activeMenuItem, setActiveMenuItem ])

    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = async () => {
        const { attributes: { email, profile } } = await Auth.currentUserInfo();
        setUsername(email);
        setRole(profile);
    }

    return (
        <DashboardUsernameContext.Provider value={providerValueUsername}>
            <DashboardMenuContext.Provider value={providerValueMenuItem}>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sidebar userRole={role} />
                    <Layout className="site-layout">
                        <CustomAntHeader />
                        {/* main start here -> style to css + to s tim div */}
                        <Content>
                            <Suspense fallback={<Spin tip="Loading..." ></Spin>}>
                                <div className="site-layout-background dashboard-content" style={{ padding: 24, minHeight: 360 }}>
                                    {modules[ parseInt(activeMenuItem) ]}
                                </div>
                            </Suspense>
                        </Content>
                        <Footer />
                    </Layout>
                </Layout>
            </DashboardMenuContext.Provider>
        </DashboardUsernameContext.Provider>
    );
}
