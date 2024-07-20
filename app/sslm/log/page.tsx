import PageStatement from '@/app/sslm/components/PageStatement';
import '@/app/globals.css';
import db from "@/app/libs/db";
import {DataTable} from "@/app/sslm/log/data/data-table";
import {columns} from "@/app/sslm/log/data/Columns";

const Page = async () => {

    const logs = await db.logs.findMany({
        include: {
            User: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    isActivated: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div className={'w-full select-none p-4'}>
            <PageStatement header={'로그 관리'} context={'기록된 로그를 확인할 수 있습니다.'}/>
            <DataTable columns={columns} data={logs} search="name"/>
        </div>
    )
};

export default Page;