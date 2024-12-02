import { useEffect } from "react";
import { AuthProvider } from "./extension/context/authContext";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthProvider>{children}</AuthProvider>
    );
}