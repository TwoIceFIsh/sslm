"use client";

import React, {useState} from "react";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {FingerprintIcon} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {toast} from "sonner";
import LoadingComponent from "@/components/LoadingComponent";
import {loginBasic} from "@/app/actinos/auth/login-basic";
import {SignInSchema} from "@/app/schema/sign-in-schema";
import ConfettiLogin from "@/app/(site)/components/Confetti";


export function LoginComponent() {
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    //State for dialog to be by opened and closed by DialogTrigger
    const [open, setOpen] = useState(false);

    const [email, setEmail] = useState("");


    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const router = useRouter();

    //Login with username(email)/password
    async function onSubmit(values: z.infer<typeof SignInSchema>) {
        setIsLoading(true);
        try {
            await loginBasic(values).then((status) => {
                if (status?.error) {
                    toast.error(status.error);
                } else if (status?.success) {
                    toast.success("로그인 성공");

                    router.push("/sslm");
                }
            })
        } catch (error: any) {
            toast.error("문제 발생");
        } finally {
            setIsLoading(false);
        }
    }

    async function onPasswordReset(email: string) {
        try {
            setIsLoading(true);
            await fetch("/api/user/passwordReset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                }),
            });
            toast.success("발송 완료");
        } catch (error) {
            if (error) {
                toast.error("문제 발생");
            }
        } finally {
            setIsLoading(false);
            setOpen(false);
        }
    }

    return (
        <Card className="shadow-lg my-5 w-full sm:w-[600px]">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">로그인</CardTitle>
            </CardHeader>
            <ConfettiLogin/>
            <CardContent className="grid gap-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>이메일</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                placeholder="drm@test.com"
                                                type="email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center w-full ">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem className="w-full">
                                            <FormLabel>비밀번호</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="w-full"
                                                    disabled={isLoading}
                                                    placeholder="*******"
                                                    type={show ? "text" : "password"}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <span
                                    className="flex px-4 pt-7 w-16"
                                    onClick={() => setShow(!show)}
                                >
                  <FingerprintIcon size={25} className="text-gray-400"/>
                </span>
                            </div>
                        </div>
                        <div className="grid gap-2 py-8">
                            <Button
                                disabled={isLoading}
                                type="submit"
                                className="flex gap-2 h-12"
                            >
                <span
                    className={
                        isLoading
                            ? " border rounded-full px-3 py-2 animate-spin"
                            : "hidden"
                    }
                >
                  Q
                </span>
                                <span className={isLoading ? " " : "hidden"}>불러오는 중 ...</span>
                                <span className={isLoading ? "hidden" : ""}>로그인</span>
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-5">
                <div className="text-sm text-gray-500">
                    새로운 계정이 필요하신가요? 담당자에게 연락주세요! <br/>
                    <div
                        className={"text-center "}>
                        {process.env.NEXT_PUBLIC_COMMENT2}
                    </div>
                </div>
                <div className="text-sm text-gray-500">
                    비밀번호를 잊으셨나요?
                    {/* Dialog start */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger className="text-blue-500">
                            <span className="pl-2 underline">여기</span>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="p-5">비밀번호 초기화</DialogTitle>
                                <DialogDescription className="p-5">
                                    이메일 주소를 입력하여 새 비밀번호를 받아보세요
                                </DialogDescription>
                            </DialogHeader>
                            {isLoading ? (
                                <LoadingComponent/>
                            ) : (
                                <div className="flex px-2 space-x-5 py-5">
                                    <Input
                                        type="email"
                                        placeholder="name@domain.com"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Button
                                        disabled={email === ""}
                                        onClick={() => {
                                            onPasswordReset(email);
                                        }}
                                    >
                                        초기화
                                    </Button>
                                </div>
                            )}
                            <DialogTrigger className="w-full text-right pt-5 ">
                                <Button variant={"destructive"}>취소</Button>
                            </DialogTrigger>
                        </DialogContent>
                    </Dialog>
                    {/* Dialog end */}
                    를 클릭해 주세요
                </div>
            </CardFooter>
        </Card>
    );
}