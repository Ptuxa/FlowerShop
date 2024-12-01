"use client";

import { Button, Menu } from "antd";
import Link from "next/link";
import { useAuth } from "../context/authContext";

export const TopMenuComponent = () => {
    const { isAuthorized, setIsAuthorized } = useAuth();

    const items = [
        { key: "home", label: <Link href={"/catalog"}>Home</Link> },
        { key: "login", style: {marginLeft: 'auto'}, label: <Button type="primary" href="/sign-in">
            {
                isAuthorized ? "Log out" : "Sign in"
            }
        </Button> }
    ];

    return (
        <Menu theme="dark" mode="horizontal" items={items}/>  
    );
};