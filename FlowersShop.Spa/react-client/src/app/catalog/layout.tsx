import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import { TopMenuComponent } from "@/app/extension/component/topMenuComponent";
import { CommonLayoutComponent } from "@/app/extension/component/commonLayoutComponent";
import { useEffect } from "react";

export default function CatalogLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <CommonLayoutComponent>
            <Layout style={{ minHeight: "100vh" }}>
                <Header>
                    <TopMenuComponent></TopMenuComponent>
                </Header>
                <Content style={{ padding: "0 48px" }}>{children}</Content>
                <Footer style={{ textAlign: "center" }}>Flower shop 2024</Footer>
            </Layout>
        </CommonLayoutComponent>
    );
}

