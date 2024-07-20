"use client";

import {useRouter} from "next/navigation";
import {DeleteIcon, EditIcon, MoreHorizontal} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";

import {toast} from "sonner";
import {DomainType} from "@/app/sslm/domain/data/DomainColumns";

interface CellActionProps {
    data: DomainType;
}


interface TemType {
    dId: number
    tId: string
    tTitle: string
    tContext: string
    tType: string
    tDate: string
}


export const DomainCellActions = ({data}: CellActionProps) => {
    const router = useRouter();

    const handleDelete = async () => {
        await fetch(`/api/sslm/domain/${data.dId}/delete`);
        toast.success("삭제되었습니다.");
        router.refresh()
    };

    const handleEdit = async () => {
        router.push(`/sslm/domain/edit/${data.dId}`);
    }

    return (
        <div className={"flex gap-2"}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleEdit}>
                        <EditIcon className="mr-2 w-4 h-4"/>
                        수정
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDelete}>
                        <DeleteIcon className="mr-2 w-4 h-4"/>
                        삭제
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};