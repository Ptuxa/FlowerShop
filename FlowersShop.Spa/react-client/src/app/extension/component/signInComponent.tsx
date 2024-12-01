"use client";

import { Form, Input, Button, Typography, Space } from "antd";
import Link from "next/link";
import { useAuth } from "../context/authContext";
import { useEffect } from "react";

const { Title, Text } = Typography;


export const SignInComponent = () => {
    const { isAuthorized, setIsAuthorized } = useAuth();

    useEffect(() => {
        // Это выполнится только на клиенте
        console.log("Client-side render");
    }, []);

    const handleLogin = (values: any) => {
        console.log("Login Data: ", values);
    };

    return (
        <div style={{ maxWidth: 400, margin: "0 auto", padding: "50px" }}>
            <Title level={3}>Login</Title>
            <Form layout="vertical" onFinish={handleLogin}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Please input your email!" }]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Login
                    </Button>
                </Form.Item>
            </Form>
            <Space direction="vertical" size="middle">
                <Text>
                    Don't have an account? <Link href="/sign-up">Register here</Link>
                </Text>
            </Space>
        </div>
    );
}