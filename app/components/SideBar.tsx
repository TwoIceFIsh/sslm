import {getModules} from "@/actions/get-modules";

import ModuleMenu from "./ModuleMenu";
import {getDictionary} from "@/dictionaries";
import {Session} from "next-auth";

const SideBar = async ({build, session}: { build: number, session: Session }) => {


    const modules = await getModules();

    if (!modules) return null;

    //Fetch translations from dictionary
    const dict = await getDictionary("ko");

    if (!dict) return null;

    return <ModuleMenu modules={modules} dict={dict} build={build} session={session}/>;
};
export default SideBar;