"use client"

import {  CloudFilled, EyeTwoTone, HomeOutlined, SoundFilled, WarningFilled } from "@ant-design/icons";
import {  Layout, Menu, MenuProps, Popover, message, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Link from "next/link";
import React from "react";

type MenuItem = Required<MenuProps>['items'][number];

export default function PageLayout({ children }: { children: React.ReactNode }) {

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
          label: 'Boston Housing',
          key: 'Chapter1',
          icon: <Popover content="Under construct, model not created"><Link href={"/chapter1"}><WarningFilled/></Link></Popover>,
        },
        {
          label: 'Computer Vision',
          key: 'Chapter2',
          icon: <Link href={"/chapter2"}><EyeTwoTone /></Link>,
        },
        {
          label: 'Audio Processing',
          key: 'Chapter3',
          icon: <Popover content="Under construct, nothing done, empty page"><Link href={"/chapter3"}><SoundFilled/></Link></Popover>,
        },
        {
          label: 'Meteo Prediction',
          disabled: true,
          key: 'Chapter4',
          icon: <Popover content="Under construct, model not ready for prediction, nav can't take too much data without crash, so I disabled this page actually"><Link href={"/chapter4"}><CloudFilled/></Link></Popover>,
        }
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