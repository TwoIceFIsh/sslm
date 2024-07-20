import React from "react";

interface SidebarTitleProps {
    text: string;
}

const SidebarTitle: React.FC<SidebarTitleProps> = ({text}) => {
    return <div className={"pl-3 text-sm font-bold text-gray-400"}>{text}</div>;
};

export default SidebarTitle;