"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";  // Ensure React is imported

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}

export default AuthProvider;
