"use client";

import {ColumnDef} from "@tanstack/react-table";
import {Badge} from "@/components/ui/badge";
import {TemplateCellAction} from "@/app/sslm/template/data/template-cell-action";
import moment from "moment";


export type TemplateType = {
    tId: number;
    tTitle: string;
    tContext: string;
    tType: string;
    tDate: Date;
};


export const templateColumns: ColumnDef<TemplateType>[] = [
    {
        accessorKey: "tId",
        header: "ID",
        cell: ({row}) => <div>{row.original.tId}</div>,
    },
    {
        accessorKey: "tType",
        header: "유형",
        cell: ({row}) => <Badge className={"shrink-0  text-nowrap"}>{row.original.tType}</Badge>,
    },
    {
        accessorKey: "tTitle",
        header: "제목",
    },

    {
        accessorKey: "tDate",
        header: "생성일",
        cell: ({row}) => <div>{moment(row.original.tDate).format("YYYY-MM-DD")}</div>,
    },
    {
        id: "actions",
        header: "설정",
        cell: ({row}) => <TemplateCellAction data={row.original}/>,
    },
];