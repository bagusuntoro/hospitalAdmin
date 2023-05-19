import React, { ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

type MenuItem = {
  label: React.ReactNode;
  key: string;
  icon?: React.ReactNode;
  link?: string;
  children?: MenuItem[];
};

function getItem(
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode,
  link?: string,
  children?: MenuItem[],
): MenuItem {
  return {
    label,
    key,
    icon,
    link,
    children,
  };
}

const items: MenuItem[] = [
  getItem('Dashboard', 'Dashboard', <PieChartOutlined />, '/dashboard'),
  getItem('Dokter', 'Dokter', <UserOutlined />, '/dokter/data'),
  getItem('Pasien', 'Pasien', <TeamOutlined />, '/pasien/antri'),
  getItem('Files', '9', <FileOutlined />, '/laporan'),
];


interface LayoutProps {
  children: ReactNode;
}

export default function Template(props: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedBreadcrumb, setSelectedBreadcrumb] = useState<string[]>([]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();

  const handleMenuClick = (link: string | undefined) => {
    if (link) {
      router.push(link);
    }
  };
  const { children } = props;

  const renderMenuItems = (menuItems: MenuItem[]): React.ReactNode => {
    return menuItems.map((item) => {
      if (item.children) {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.label}>
            {renderMenuItems(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key} icon={item.icon} onClick={() => handleMenuClick(item.link)}>
          {item.label}
        </Menu.Item>
      );
    });
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {renderMenuItems(items)}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
            {selectedBreadcrumb.map((breadcrumbItem) => (
              <Breadcrumb.Item key={breadcrumbItem}>{breadcrumbItem}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div style={{
            padding: 24, minHeight: 360,
            background: colorBgContainer
          }}>
            <div>{children}</div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>&copy; 2023 with love by Bagus Untoro</Footer>
      </Layout>
    </Layout>
  );
};

