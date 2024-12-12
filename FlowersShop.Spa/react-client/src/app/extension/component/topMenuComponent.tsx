"use client";

import { Button, Menu } from "antd";
import Link from "next/link";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";
import { AuthenticationService } from "../services/impl/authenticationService";

export const TopMenuComponent = () => {
    const { isAuthorized, setIsAuthorized } = useAuth();
    const router = useRouter();

    const handleAuthButtonClick = async (): Promise<void> => {
        if (isAuthorized) {
            try {
                await AuthenticationService.logoutUser();
            } catch (error) {
                throw error;
            }

            setIsAuthorized(false);
        }

        router.push("/sign-in");
    }

    const items = [
        { key: "home", label: <Link href={"/catalog"}>Home</Link> },
        ...(isAuthorized
            ? [{ key: "categories", label: <Link href={"/categories"}>Categories</Link> }]
            : []),
        {
            key: "login", style: { marginLeft: 'auto' }, label: <Button type="primary" onClick={() => handleAuthButtonClick()}>
                {
                    isAuthorized ? "Log out" : "Sign in"
                }
            </Button>
        }
    ];

    return (
        <Menu theme="dark" mode="horizontal" items={items} />
    );
};