"use client";

import { Logout } from "@/action/authHandler";

interface LogoutButtonProps {
    children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
    const onClick = () => {
        Logout();
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}