import { Menu } from "antd";
import "./globals.css";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";

// const items = [

// ];

// const items = [

// ];

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header>
                <TopMenu />
            </Header>
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <BookSection />
                </Sider>
                <Content style={{ padding: '0 50px' }}>
                    {/* Main content here */}
                </Content>
            </Layout>
            <Footer style={{ textAlign: 'center' }}>Book store 2023 Created by Ptuxa</Footer>
        </Layout>
    );
}

