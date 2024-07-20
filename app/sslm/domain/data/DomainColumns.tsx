"use client";

import {ColumnDef} from "@tanstack/react-table";
import moment from "moment";
import {DomainCellActions} from "@/app/sslm/domain/data/domain-cell-action";


export type DomainType = {
    dId: number;
    dName: string | null;
    dEmail: string | null;
    dOwner: string | null;
    dDate: Date
    dType: string | null;
};

const anonymizeName = (name: string) => {
    if (name.includes("(")) {
        const nameParts = name.split('(');
        let koreanName = nameParts[1]?.split(')')[0];
        if (koreanName?.length === 3)
            koreanName = koreanName?.slice(0, 1) + "*" + koreanName?.slice(2);
        else if (koreanName?.length === 2)
            koreanName = koreanName?.slice(0, 1) + "*";
        return `${koreanName}`;
    } else {
        if (name.length === 3)
            return name.slice(0, 1) + "*" + name.slice(2);
        else if (name.length === 2)
            return name.slice(0, 1) + "*";
        else
            return name;
    }
};

// Usage in your component
export const DomainColumns: ColumnDef<DomainType>[] = [

    {
        accessorKey: "dId",
        header: "번호",
        cell: ({row}) => <div>{row.original.dId}</div>,
    },
    {
        accessorKey: "dType",
        header: "유형",
    },
    {
        accessorKey: "dDate",
        header: "만료일",
        cell: ({row}) => <div>{moment(row.original.dDate).format("YYYY/MM/DD")}</div>,
    },
    {
        accessorKey: "dName",
        header: "도메인 이름",
    },

    {
        accessorKey: "dOwner",
        header: "소유자",
        cell: ({row}) => <div>

            <div>{anonymizeName(row.original.dOwner as string)}</div>


        </div>,
    },
    {
        accessorKey: "dEmail",
        header: "이메일",
        cell: ({row}) =>
            <div>{row.original.dEmail?.split("@")[0].slice(0, 3) + "**@" + row.original.dEmail?.split("@")[1]}</div>,
    },
    {
        id: "actions",
        header: "설정",
        cell: ({row}) => <DomainCellActions data={row.original}/>,
    },
];