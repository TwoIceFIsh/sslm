import React from 'react';
import getInitMain from '@/app/actinos/init-main';
import '@/app/globals.css';
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import db from "@/app/libs/db";
import {CircleDotDashed, CircleXIcon, GlobeIcon,} from "lucide-react";
import {currentUser} from "@/app/libs/current-user";


// Function to add days to a date
function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

// Function to subtract days from a date
function subtractDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
}

const getData1 = async (user_id: string) => {
    return db.domain.findMany({
        where: {
            dDate: {
                gt: new Date(), // Greater than or equal to today
                lte: addDays(new Date(), 30) // Less than or equal to 30 days from today
            },
            usersId: user_id
        }
    });
}
const getData2 = async (user_id: string) => {

    return db.domain.findMany({
        where: {
            usersId: user_id
        }
    })
}

const getData3 = async (user_id: string) => {
    return db.headerData.findMany({
        where: {
            usersId: user_id
        }
    })
}

const getData4 = async (user_id: string) => {
    return db.domain.findMany({
        where: {
            dDate: {
                lt: new Date()
            },
            usersId: user_id
        }
    })
}

export default async function Home() {
    const user = await currentUser()
    const [
        soonExpireDomain,
        allDomains,
        allData,
        endedDomains
        ,] = await Promise.all([getData1(user?.id as string),
        getData2(user?.id as string),
        getData3(user?.id as string),
        getData4(user?.id as string)])


    return (
        <Card className={'flex  justify-center text-center shadow-lg'}>
            <CardContent className={" flex flex-col items-center gap-4 mt-4"}>
                <div className={'text-2xl'}>{getInitMain('COMMENT1')}</div>

                <div className={"flex gap-2"}>
                    <Card>
                        <CardHeader className={"flex flex-col gap-2"}>
                            <CardTitle className={"flex gap-2 text-green-600"}><GlobeIcon className={"animate-spin "}/>총
                                도메인</CardTitle>
                            <div className={"text-3xl"}>{allDomains.length}건</div>
                        </CardHeader>

                    </Card>
                    <Card>
                        <CardHeader className={"flex flex-col gap-2"}>
                            <CardTitle className={"flex gap-2 text-cyan-600"}><CircleDotDashed
                                className={"animate-spin "}/>총 백데이터</CardTitle>
                            <div className={"text-3xl"}>{allData.length}건</div>
                        </CardHeader>

                    </Card>
                    <Card>
                        <CardHeader className={"flex flex-col gap-2"}>
                            <CardTitle className={"flex gap-2 text-red-600"}><CircleXIcon className={"animate-spin "}/>만료(예정)</CardTitle>
                            <div className={"text-3xl"}>{endedDomains.length}({soonExpireDomain.length})건</div>
                            <CardDescription className={"text-end"}>* 30일 이내 </CardDescription>
                        </CardHeader>
                    </Card>

                </div>
                <div className={"flex flex-col gap-2"}>
                    <div className={'text-xm'}>{getInitMain('COMMENT2')}</div>
                    <div className={'text-xm'}>{getInitMain('COMMENT3')}</div>
                </div>
            </CardContent>
        </Card>
    );
}