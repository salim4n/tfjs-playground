"use client"

import {  HomeOutlined, InboxOutlined, LineChartOutlined } from "@ant-design/icons";
import {  Layout, Menu, MenuProps, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Link from "next/link";

type MenuItem = Required<MenuProps>['items'][number];

export default function PageLayout({children}: Readonly<{children: React.ReactNode;}>) {

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

      const items: MenuItem[] = [
        {
          label: 'Tensorflow Playground',
          key: 'Home',
          icon: <Link href={"/"}><HomeOutlined /></Link>,
        },
        {
          label: 'Reg Lineaire',
          key: 'Chapter1',
          icon: <Link href={"/chapter1"}><LineChartOutlined/></Link>,
        },
        {
          label: 'Multi-Classe',
          key: 'Chapter2',
          icon: <Link href={"/chapter2"}><InboxOutlined /></Link>,
        },
      ];

    return (
    <Layout className="layout-full-height" style={{ minHeight: '100vh' }}>
        <Header className="flex items-center">
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={items}
                style={{ flex: 1, minWidth: 0 }}
            />
        </Header>
        <Content className="flex-grow" style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}>
            {children}
        </Content>
        <Footer className="mt-auto text-center">
        ©{new Date().getFullYear()} Created by Salim4n
        </Footer>
    </Layout>
);

}