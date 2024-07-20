import PageStatement from '@/app/sslm/components/PageStatement';
import '@/app/globals.css';
import db from "@/app/libs/db";
import {DataTable} from "@/app/sslm/user/data/data-table";
import {columns} from "@/app/sslm/user/data/Columns";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const Page = async () => {

    const users = await db.users.findMany()

    return (
        <div className={'w-full select-none p-4'}>
            <Link className={"flex justify-end"} href={"/sslm/user/new"}>
                <Button>신규/생성</Button>
            </Link>
            <PageStatement header={'유저 관리'} context={'유저 승인을 관리할 수 있습니다.'}/>
            <DataTable columns={columns} data={users} search="name"/>
        </div>
    )
};

export default Page;