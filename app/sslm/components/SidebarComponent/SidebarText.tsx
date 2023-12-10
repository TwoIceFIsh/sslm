"use client";
import {useEffect, useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import clsx from "clsx";

interface SidebarTextProps {
    text: string;
    url: string;
}

const SidebarText: React.FC<SidebarTextProps> = ({text, url}) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const pathname = usePathname();

    useEffect(() => {
        // 현재 경로와 링크의 경로가 같으면 활성화
        if (pathname === url) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [pathname, url]);

    return (
        <Link href={url}>
            <div
                className={clsx(
                    "flex items-center py-2 pl-2 text-xs hover:bg-gray-200 hover:text-blue-300",
                    isActive && "rounded-l-sm border-l-4 border-blue-600 bg-gray-200",
                )}
            >
                <div className={"flex-grow"}>{text}</div>
                <div className={"flex-1 pr-3 text-end text-xs text-gray-400"}></div>
            </div>
        </Link>
    );
};

export default SidebarText;
