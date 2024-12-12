"use client";
import { CommonLayoutComponent } from "@/app/extension/component/commonLayoutComponent";

export default function SignInLayout ({ children }: { children: React.ReactNode }) {
    return (
        <CommonLayoutComponent>
            {children}
        </CommonLayoutComponent>
    );
};