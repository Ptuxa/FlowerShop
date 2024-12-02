"use client";

import { Form, Input, Button, Typography, Space } from "antd";
import Link from "next/link";
import { useAuth } from "../context/authContext";
import { useEffect } from "react";
import { AuthenticationService } from "../services/impl/authenticationService";
import { useRouter } from 'next/router';
import { AuthenticationMapper } from "../services/mapper/authenticationMapper";
import { SignInRequest } from "../model/dto/request/signInRequest";
import { SignInFieldsData } from "../struct/signInFieldsData";

const { Title, Text } = Typography;


const router = useRouter();

export const SignInComponent = () => {
    const { isAuthorized, setIsAuthorized } = useAuth();

    const handleLogin = async (signInFieldsData: SignInFieldsData): Promise<void> => {
        try {
            await AuthenticationService.signInUser(AuthenticationMapper.toSignInRequest(signInFieldsData))
        } catch(error) {
            throw error;
        }

        setIsAuthorized(true);
        router.push("/catalog");
    };

    return (
        <div style={{ maxWidth: 400, margin: "0 auto", padding: "50px" }}>
            <Title level={3}>Login</Title>
            <Form layout="vertical" onFinish={(values) => handleLogin(values)}>
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