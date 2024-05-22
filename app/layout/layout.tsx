"use client"

import {  CloudFilled, DollarCircleFilled, EyeTwoTone, GithubFilled, HarmonyOSOutlined, HomeOutlined, RobotFilled, RobotOutlined, SoundFilled, WarningFilled } from "@ant-design/icons";
import {  Layout, Menu, MenuProps, Popover, theme } from "antd";
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
          label: 'Object Detection',
          key: 'Chapter2',
          icon: <Link href={"/chapter2"}><EyeTwoTone /></Link>,
        },
        {
          label: 'Speech Recognition',
          key: 'Chapter3',
          icon:<Link href={"/chapter3"}><SoundFilled/></Link>,
        },
        {
          label: 'Hand Pose Detection',
          key: 'Chapter5',
          icon: <Link href={"/chapter5"}><HarmonyOSOutlined /></Link>,
        },
        {
          label: 'Trading Bot',
          key: 'Chapter8',
          icon :<Link href={'/chapter8'} ><DollarCircleFilled/></Link>,
        },
        {
          label: 'Cartpole Game',
          key: 'Chapter6',
          icon : <Link href={"/chapter6"}><RobotFilled/></Link>,
        },
        {
          label: 'Obstacle Avoidance',
          key: 'Chapter7',
          disabled: true,
          icon :<Popover content="Environment 3D in construction ..."><RobotOutlined/></Popover>,
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
        ©{new Date().getFullYear()} Created by Salim4n <Link href={"https://github.com/salim4n"}><GithubFilled /></Link>
        </Footer>
    </Layout>
);

}