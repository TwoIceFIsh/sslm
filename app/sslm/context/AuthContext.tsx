'use client';
import '@/app/globals.css';

export interface AuthContextProps {
    children: React.ReactNode;
    className?: string;
}

export default function AuthContext({children, className}: AuthContextProps) {
    return (
        <div className={className}>{children}</div>
    );
}