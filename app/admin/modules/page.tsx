import React from "react";

import {columns} from "./components/Columns";
import {DataTable} from "./components/data-table";
import Container from "../../components/ui/Container";

import {getModules} from "@/actions/get-modules";

const AdminModulesPage = async () => {


    const modules: any = await getModules();
    return (
        <Container
            title="모듈 관리"
            description={"SSLM의 모듈을 관리할 수 있습니다."}
        >
            <DataTable columns={columns} data={modules} search="name"/>
        </Container>
    );
};

export default AdminModulesPage;