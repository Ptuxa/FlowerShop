"use client";
import { CommonLayoutComponent } from "@/app/extension/component/commonLayoutComponent";

export default function SignUpLayout ({ children }: { children: React.ReactNode }) {
    return (
        <CommonLayoutComponent>
            {children}
        </CommonLayoutComponent>
    );
};