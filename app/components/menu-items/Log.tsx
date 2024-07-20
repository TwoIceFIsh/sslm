"use client";
import {Lightbulb} from "lucide-react";
import Link from "next/link";

import {usePathname} from "next/navigation";
import React from "react";

type Props = {
    open: boolean;
};

const LogModuleMenu = ({open}: Props) => {
    const pathname = usePathname();
    const isPath = pathname.includes("log");
    return (
        <div className="flex flex-row items-center mx-auto p-2">
            <Link
                href={"/sslm/log"}
                className={`flex gap-2 p-2 ${isPath ? "text-muted-foreground" : null}`}
            >
                <Lightbulb className="w-6"/>
                <span className={open ? "" : "hidden"}>로그</span>
            </Link>
        </div>
    );
};

export default LogModuleMenu;