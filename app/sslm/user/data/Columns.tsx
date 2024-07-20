"use client";

import {ColumnDef} from "@tanstack/react-table";
import {CellAction} from "@/app/sslm/user/data/cell-action";
import {Badge} from "@/components/ui/badge";


export type UserColumn = {
    id: string;
    name: string;
    email: string;
    isActivated: boolean;
    role: string;
};

export const columns: ColumnDef<UserColumn>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({row}) => <div>{row.original.id.slice(0, 5)}</div>,
    },
    {
        accessorKey: "name",
        header: "이름",
    },
    {
        accessorKey: "isVarified",
        header: "활성",
        cell: ({row}) => {
            return row.original.isActivated ? (
                <Badge>
                    활성
                </Badge>
            ) : (
                <Badge variant={"destructive"}>
                    비활성
                </Badge>
            );
        }
    },
    {
        accessorKey: "email",
        header: "이메일",
    },
    {
        accessorKey: "role",
        header: "역할",
        cell: ({row}) => {
            return row.original.role === "admin" ? (
                <Badge variant={"default"}>
                    관리자
                </Badge>
            ) : (
                <Badge variant={"secondary"}>
                    사용자
                </Badge>
            );

        }
    },
    {
        id: "actions",
        header: "설정",
        cell: ({row}) => <CellAction data={row.original}/>,
    },
];