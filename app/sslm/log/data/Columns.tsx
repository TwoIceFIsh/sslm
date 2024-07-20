"use client";

import {ColumnDef} from "@tanstack/react-table";
import moment from "moment/moment";

export type LogColumn = {
    id: string;
    text: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    User: {
        id: string;
        name: string;
        email: string;
        role: string;
        isActivated: boolean;
    } | null
}


export const columns: ColumnDef<LogColumn>[] = [
    {
        id: "id",
        header: "id",
        cell: ({row}) => (
            <>
                <div>{row.original.id.slice(0, 5)}</div>
            </>
        ),
    },
    {
        id: "createdAt",
        header: "createdAt",
        cell: ({row}) => (
            <>
                <div>{moment(row.original.createdAt).format("YYYY/MM/DD HH:mm:ss")}</div>
            </>
        ),
    },
    {
        id: "text",
        header: "text",
        cell: ({row}) => (
            <>
                <div className={"overflow-x-auto max-w-screen-sm"}>{row.original.text}</div>
            </>
        ),
    },
    {
        id: "user",
        header: "user",
        cell: ({row}) => (
            <>
                <div className={"overflow-x-auto max-w-screen-sm"}>{row.original?.User?.name}</div>
            </>
        ),
    },
];