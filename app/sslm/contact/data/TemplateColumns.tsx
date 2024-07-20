"use client";

import {ColumnDef} from "@tanstack/react-table";
import {Badge} from "@/components/ui/badge";
import {TemplateCellAction} from "@/app/sslm/template/data/template-cell-action";


export type TemplateType = {
    tId: number;
    tTitle: string;
    tContext: string
    tType: string
    tDate: Date
    userId: string
};


export const templateColumns: ColumnDef<TemplateType>[] = [
    {
        accessorKey: "tId",
        header: "ID",
        cell: ({row}) => <div>{row.original.tId}</div>,
    },
    {
        accessorKey: "tType",
        header: "tType",
        cell: ({row}) => <Badge>{row.original.tType}</Badge>,
    },
    {
        accessorKey: "tTitle",
        header: "tTitle",
    },

    {
        accessorKey: "tDate",
        header: "tDate",
    },
    {
        id: "actions",
        header: "설정",
        cell: ({row}) => <TemplateCellAction data={row.original}/>,
    },
];