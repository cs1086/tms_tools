import React from 'react';
import { Avatar, Flex, Layout, LayoutProps, Menu, Space } from 'antd';
import { Image } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  QrcodeOutlined,
  ToolOutlined,
  SettingOutlined,
  EditOutlined,
  SignatureOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import Button from './Button';
import StyledParagraph from './Text';
import styled from 'styled-components';
import Head from 'next/head';

const { Header, Content, Sider } = Layout;

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 24px',
  background: '#001529',
  color: 'white',
};
const rightAlignedStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  margin: '20.px'
};
const centeredStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
};
const CustomLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Head>
        <title>TMS TOOLS</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header style={headerStyle}>
        <div style={centeredStyle}>
          <Image width={30} src="favicon.png" />
          <StyledParagraph>TMS Tools</StyledParagraph>
        </div>
        <div style={rightAlignedStyle}>
          <Space align="center">
            <Avatar size={30} icon={<UserOutlined />} style={{ backgroundColor: '#FFFFFF', color: '#000000' }} />
            <p style={{ color: 'white' }}>遊民</p>
          </Space>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="1" icon={<QrcodeOutlined />}>
              <Link href="/">訂單條碼</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<EditOutlined />}>
              <Link href="/tools">安排訂單</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<RedoOutlined />}>
              <Link href="/reset_itinerary">重置訂單初始推播</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<SignatureOutlined />}>
              <Link href="/tools">重置簽名</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<SettingOutlined />}>
              <Link href="/tools">系統設定</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default CustomLayout;
