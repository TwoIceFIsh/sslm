import Link from "next/link";


import {Button} from "@/components/ui/button";
import Container from "../components/ui/Container";


const AdminPage = async () => {

    return (
        <Container
            title="관리자"
            description={"SSLM의 세팅을 할 수 있습니다."}
        >
            <div className="space-x-2">
                <Button asChild>
                    <Link href={"/sslm/user"}>사용자 관리</Link>
                </Button>
                <Button asChild>
                    <Link href={"/admin/modules"}>모듈 관리</Link>
                </Button>
            </div>
        </Container>
    );
};

export default AdminPage;