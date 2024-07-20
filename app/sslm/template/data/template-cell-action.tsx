"use client";

import {useRouter} from "next/navigation";
import {DeleteIcon, EditIcon, MoreHorizontal} from "lucide-react";

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";

import {toast} from "sonner";
import {TemplateType} from "@/app/sslm/template/data/TemplateColumns";

interface CellActionProps {
    data: TemplateType;
}

export const TemplateCellAction = ({data}: CellActionProps) => {
    const router = useRouter();

    const modifyTemplate = async () => {
        try {
            router.push(`/sslm/template/edit/${data.tId}`);
        } catch (error) {
            toast.error(" 사용자 활성화 실패");
        }
    };

    const deleteTemplate = async () => {
        try {
            await fetch(`/api/sslm/template/${data.tId}/delete`);
            router.refresh();
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
                    <DropdownMenuItem onClick={() => modifyTemplate()}>
                        <EditIcon className="mr-2 w-4 h-4"/>
                        수정
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => deleteTemplate()}>
                        <DeleteIcon className="mr-2 w-4 h-4"/>
                        삭제
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};