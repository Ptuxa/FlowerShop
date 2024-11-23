import { Menu } from "antd";
import "./globals.css";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";

// const items = [
    
// ];

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Layout style={{ minHeight: "100vh" }}>
                    <Header>
                        {/* <Menu/> */}
                    </Header>
                    <Content></Content>                
                    <Footer></Footer>
                </Layout>
            </body>            
        </html>
    );
}

