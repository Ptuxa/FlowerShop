"use client";

import { Button, Menu } from "antd";
import Link from "next/link";
import { useAuth } from "../context/authContext";


export const TopMenuComponent = () => {
    const { isAuthorized, setIsAuthorized } = useAuth();

    return (
        <Menu theme="dark" mode="horizontal">
            <Menu.Item key="catalog">
                <Link href="/">Catalog</Link>
            </Menu.Item>
            <Menu.Item key="login" style={{ marginLeft: 'auto' }}>
                <Button type="primary" href="/login">
                    {
                        isAuthorized ? "Sign in" : "Log out"
                    }
                </Button>
            </Menu.Item>
        </Menu>
    );
};