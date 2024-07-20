"use client";

import React, {useEffect, useState} from "react";

import LogModuleMenu from "./menu-items/Log";

import AdministrationMenu from "./menu-items/Administration";
import DashboardMenu from "./menu-items/Dashboard";
import {cn} from "@/lib/utils";
import ContactModuleMenu from "@/app/components/menu-items/Contact";
import DomainModuleMenu from "@/app/components/menu-items/Domain";
import BackDataMenu from "@/app/components/menu-items/BackData";
import TemplateModuleMenu from "@/app/components/menu-items/Template";
import SettingModuleMenu from "@/app/components/menu-items/Setting";
import {Session} from "next-auth";

type Props = {
    modules: any;
    dict: any;
    build: number;
    session: Session
};

const ModuleMenu = ({modules, dict, build, session}: Props) => {
    const [open, setOpen] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="flex flex-col">
            <div
                className={` ${
                    open ? "w-72" : "w-20 "
                }  h-screen p-5  pt-8 relative duration-300`}
            >
                <div className="flex gap-x-4 items-center">
                    <div
                        className={`cursor-pointer duration-500 border rounded-full px-4 py-2 ${
                            open && "rotate-[360deg]"
                        }`}
                        onClick={() => setOpen(!open)}
                    >
                        HQ
                    </div>

                    <h1
                        className={` origin-left font-medium text-xl duration-200 ${
                            !open && "scale-0"
                        }`}
                    >
                        {process.env.NEXT_PUBLIC_APP_NAME}
                    </h1>
                </div>
                <div className="pt-6">
                    <DashboardMenu open={open} title={dict.ModuleMenu.dashboard}/>
                    <ContactModuleMenu open={open} title={dict.ModuleMenu.contact}/>
                    <DomainModuleMenu open={open} title={dict.ModuleMenu.domain}/>
                    <BackDataMenu open={open} title={dict.ModuleMenu.backdata}/>
                    <TemplateModuleMenu open={open} title={dict.ModuleMenu.template}/>
                    <SettingModuleMenu open={open} title={dict.ModuleMenu.setting}/>

                    {session?.user.role === "admin" &&
                        (<>
                            <div className={"mt-9"}>관리자 영역</div>
                            <AdministrationMenu open={open} title={dict.ModuleMenu.admin}/>
                            {modules.find(
                                (menuItem: any) => menuItem.name === "로그" && menuItem.enabled
                            ) ? (
                                <LogModuleMenu open={open}/>
                            ) : null}
                        </>)

                    }
                </div>
            </div>
            <div
                className={cn("flex justify-center items-center w-full", {
                    hidden: !open,
                })}
            >
        <span className="text-xs text-gray-500 pb-2">
          build: 2.0.0-beta-{build}
        </span>
            </div>
        </div>
    );
};

export default ModuleMenu;