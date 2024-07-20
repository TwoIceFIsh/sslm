"use client"
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {saveUser} from "@/app/sslm/user/new/actions/new-user";
import {UserSchema} from "@/app/schema/user-schema";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";

import React, {useTransition} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Input} from "@/components/ui/input";

const Page = () => {

    const router = useRouter();
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof UserSchema>>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit = (values: z.infer<typeof UserSchema>) => {
        startTransition(async () => {
            const result = await saveUser(values)
            if (result.success) {
                toast.success('저장되었습니다.')
                router.push('/sslm/user')
                router.refresh()
            } else {
                toast.error('이미 존재하는 이메일입니다.')
            }
        })
    }

    return (
        <Form {...form}>
            <form className={"space-y-6"} onSubmit={form.handleSubmit(onSubmit)}>
                <Card className={'flex  flex-col justify-center gap-4 bg-white p-4 text-xs'}>
                    <CardHeader>
                        <CardTitle>회원정보</CardTitle>
                        <CardDescription>해당 회원의 정보를 수정할 수 있습니다.</CardDescription>
                    </CardHeader>
                    <CardContent className={'flex justify-between flex-col gap-6'}>
                        <FormField
                            control={form.control}
                            name={"email"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>이메일</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={"email"}
                                            disabled={isPending}
                                            type={"email"}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"name"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>이름</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={"name"}
                                            disabled={isPending}
                                            type={""}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={"password"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>암호</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={"password"}
                                            disabled={isPending}
                                            type={"password"}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                    </CardContent>
                    <CardFooter className={"flex gap-2"}>
                        <Button
                            type={"submit"}
                        >
                            저장
                        </Button>
                        <Button
                            variant={"destructive"}

                        >
                            취소
                        </Button>
                    </CardFooter>
                </Card>

            </form>
        </Form>
    )
}

export default Page;