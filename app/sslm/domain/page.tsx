import PageStatement from '@/app/sslm/components/PageStatement';
import db from "@/app/libs/db";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {currentUser} from "@/app/libs/current-user";
import {DomainDataTable} from "@/app/sslm/domain/data/domain-data-table";
import {DomainColumns} from "@/app/sslm/domain/data/DomainColumns";

const Page = async () => {

    const user = await currentUser()
    const domains = await db.domain.findMany({
        where: {
            usersId: user?.id
        }
    });

    return (
        <div className={'w-full p-4'}>
            <PageStatement
                header={'도메인 관리'}
                context={'도메인 현황을 관리하고 메일 또는 메시지를 발송할 수 있습니다.'}
            /><Link href={" /sslm/domain/new"}>
            <Button>
                등록/추가
            </Button></Link>
            <DomainDataTable columns={DomainColumns} data={domains} search="tTitle"/>

        </div>
    );
};

export default Page;