import { FC } from 'react'
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import logo from '../../images/logo.png';
import { ISidebar } from '../../types/dashboard';

const { Sider } = Layout;
const { SubMenu } = Menu;

export const Sidebar: FC<ISidebar> = ({ userRole }) => {
    return (
        <Sider collapsible > {/* collapsed={collapsed} onCollapse={this.onCollapse} */}
            <div className="logo" ><img src={logo} style={{ width: "100%" }} alt="Portalo"></img></div>
            <Menu theme="dark" defaultSelectedKeys={[ 'sub1' ]} mode="inline">
                <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                    {userRole === 'admin' ? <Menu.Item key="1">New User</Menu.Item> : ''}
                    <Menu.Item key="2" icon={<DesktopOutlined />}>Info</Menu.Item>
                    <Menu.Item key="3" icon={<PieChartOutlined />}>Vacation</Menu.Item>
                    <Menu.Item key="4">Finances</Menu.Item>
                    <Menu.Item key="5">Devices</Menu.Item>
                </SubMenu>
                <Menu.Item key="6" icon={<FileOutlined />}>Rooms</Menu.Item>
                <Menu.Item key="7" icon={<FileOutlined />}>Projects</Menu.Item>
                <Menu.Item key="8" icon={<FileOutlined />}>Benefits</Menu.Item>
            </Menu>
        </Sider>
    )
}