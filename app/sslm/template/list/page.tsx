import PageStatement from '@/app/sslm/components/PageStatement';
import {DataTable} from "@/app/sslm/user/data/data-table";
import {templateColumns} from "@/app/sslm/template/data/TemplateColumns";
import db from "@/app/libs/db";
import {currentUser} from "@/app/libs/current-user";
import NewButton from "@/app/sslm/template/list/component/newButton";

const Page = async () => {
    const user = await currentUser()
    const templateData = await db.template.findMany({
        where: {
            usersId: user?.id
        }
    });


    return (
        <div className={'w-full  p-4'}>
            <PageStatement
                header={'이메일/메시지 양식 관리'}
                context={'이메일 및 메시지 양식을 관리할 수 있습니다.'}
            />

            <div className={'mb-2 flex w-full'}>
                <NewButton/>
            </div>
            <DataTable columns={templateColumns} data={templateData} search="tTitle"/>
        </div>
    );
};

export default Page;