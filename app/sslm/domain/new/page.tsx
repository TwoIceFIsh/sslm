"use client"
import React, {useTransition} from 'react';
import getUserName from "@/app/actinos/dooray-search-name";
import getInitMain from "@/app/actinos/init-main";
import {toast} from "sonner";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import LoadingComponent from "@/components/LoadingComponent";
import {DomainSchema} from "@/app/schema/domain-schema";
import {useRouter} from "next/navigation";
import {newDomain} from "@/app/actinos/domain/new-domain";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import {ko} from "date-fns/locale/ko";

const Page = () => {

    const checkOwner = async () => {
        const data = await getUserName(form.getValues("dOwner"));
        if (data != undefined) {

            form.setValue('dOwner', data?.name as string);
            form.setValue('dEmail', data.userCode + `@${getInitMain('EMAIL_DOMAIN')}`);
        }

    };

    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof DomainSchema>>({
        resolver: zodResolver(DomainSchema),
        defaultValues: {
            dName: "",
            dType: "",
            dOwner: "",
            dEmail: "",
            dDate: new Date(),
        },
    });

    const router = useRouter()

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof DomainSchema>) {
        startTransition(async () => {
            await newDomain(values).then((r) => {
                if (r?.error) {
                    toast.error(r.error as string);
                } else {
                    toast.success('도메인 추가 성공');
                    router.push('/sslm/domain');
                    router.refresh();

                }
            });
        });
    }


    return (
        <Card className={" w-[600px] "}>
            <CardHeader>
                <CardTitle>도메인 추가</CardTitle>
                <CardDescription>도메인을 추가합니다.</CardDescription>
            </CardHeader>
            <Form {...form} >
                {isPending && <LoadingComponent/>}
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <CardContent>
                        <FormField
                            control={form.control}
                            name={"dName"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>도메인</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={""}
                                            disabled={isPending}
                                            type={"text"}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"dType"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>유형</FormLabel>
                                    <Select
                                        disabled={isPending}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={"유형을 선택해 주세요"} defaultValue={"a"}/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={"1년"}>1년</SelectItem>
                                            <SelectItem value={"2년"}>2년</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={"dOwner"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>담당자</FormLabel>
                                    <div className={"flex gap-2"}>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={"김철수"}
                                                disabled={isPending}
                                                type={"text"}
                                            />
                                        </FormControl>
                                        <Button type={"button"} onClick={checkOwner}>검색</Button>
                                    </div>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={"dEmail"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>이메일</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={""}
                                            disabled={isPending}
                                            type={"text"}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dDate"
                            render={({field}) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>만료일</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP", {
                                                            locale: ko
                                                        })
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                className="rounded-md border"
                                            />
                                        </PopoverContent>
                                    </Popover>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className={'flex gap-2'}>
                        <Button
                            onClick={() => onSubmit}
                        >
                            저장
                        </Button>
                        <Button
                            variant={"destructive"}
                            onClick={() => router.back()}
                        >
                            취소
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
};

export default Page;