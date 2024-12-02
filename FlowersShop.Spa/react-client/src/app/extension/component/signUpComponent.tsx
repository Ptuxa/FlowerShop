"use client";

import { Form, Input, Button, Typography } from "antd";
import Link from "next/link";
import { SignUpFieldsData } from "../struct/signUpFieldsData";
import { AuthenticationService } from "../services/impl/authenticationService";
import { AuthenticationMapper } from "../services/mapper/authenticationMapper";
import { useRouter } from 'next/navigation';
import { BackButtonComponent } from "./backButtonComponent";

const { Title, Text } = Typography;

export const SignUpComponent = () => {
    const router = useRouter();

    const handleRegister = async (signUpFieldsData: SignUpFieldsData): Promise<void> => {
        try {
            await AuthenticationService.signUpUser(AuthenticationMapper.toSignUpRequest(signUpFieldsData))
        } catch (error) {
            throw error;
        }

        router.push("/login");
    };

    return (
        <div style={{ position: "relative" }}>
            <BackButtonComponent />
            <div style={{ maxWidth: 400, margin: "0 auto", padding: "50px" }}>
                <Title level={3}>Register</Title>
                <Form layout="vertical" onFinish={(values) => handleRegister(values)}>
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
                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        dependencies={["password"]}
                        rules={[
                            { required: true, message: "Please confirm your password!" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Passwords do not match!"));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
                <Text>
                    Already have an account? <Link href="sign-in">Login here</Link>
                </Text>
            </div>
        </div>
    );
};