"use client";
import Button from "antd/es/button";
import { useRouter } from "next/navigation";
import { LeftOutlined } from "@ant-design/icons";


export const BackButtonComponent = () => {
    const router = useRouter();

    return (
        <Button
            type="link"
            icon={<LeftOutlined />}
            onClick={() => router.back()}
            style={{
                display: "flex",
                alignItems: "center",
                position: "absolute",
                top: "10px",
                left: "10px",
                fontSize: "14px",
                color: "#1890ff",
            }}
        >
            Back
        </Button>
    );
};