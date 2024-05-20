import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import PageLayout from "./layout/layout";
import { ConfigProvider } from "antd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TFJS - Playground",
  description: "Tensorflow.js Playground",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: '#597ef7',
        colorLink: '#b37feb',
        colorSuccess: '#87d068',
        colorWarning: '#faad14',
        colorError: '#f50',
        colorBgBase: 'silver',
        colorBgBlur: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 2,
        // Alias Token
        colorBgContainer: '#f0f0f0',
      },
    }}
  >  
  </ConfigProvider>
      <body className={inter.className}>
        <AntdRegistry>
          <PageLayout>
            {children}
            </PageLayout>
          </AntdRegistry>
        </body>
    </html>
  );
}
