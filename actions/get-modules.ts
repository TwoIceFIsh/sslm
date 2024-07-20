import db from "@/app/libs/db";


export const getModules = async () => {
    const data = await db.system_Modules_Enabled.findMany({
        orderBy: {position: "asc"}

    });
    return data;
};