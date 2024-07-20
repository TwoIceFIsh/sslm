"use client";

import {useRouter} from "next/navigation";
import {MoreHorizontal, PowerIcon, PowerOffIcon, UserIcon} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {UserColumn} from "@/app/sslm/user/data/Columns";

interface CellActionProps {
    data: UserColumn;
}

export const CellAction = ({data}: CellActionProps) => {
    const router = useRouter();

    const onActivate = async () => {
        try {
            await fetch(`/api/user/activeUser/${data.id}`);
            router.refresh();
            toast.success("사용자 활성화 완료");
        } catch (error) {
            toast.error(" 사용자 활성화 실패");
        }
    };

    const onDeactivate = async () => {
        try {
            await fetch(`/api/user/deactiveUser/${data.id}`);
            router.refresh();
            toast.success(" 사용자 비활성화 완료");
        } catch (error) {
            toast.error(" 사용자 비활성화 실패");
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onActivate()}>
                        <PowerIcon className="mr-2 w-4 h-4"/>
                        활성
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDeactivate()}>
                        <PowerOffIcon className="mr-2 w-4 h-4"/>
                        비활성
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/sslm/user/edit/${data.id}`)}>
                        <UserIcon className="mr-2 w-4 h-4"/>
                        수정
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};