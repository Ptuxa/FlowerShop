"use client";

import { AuthProvider } from "../context/authContext";

export const CommonLayoutComponent = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body>  
                <>
                    { children }           
                </>
            </body>
        </html>
    );
};