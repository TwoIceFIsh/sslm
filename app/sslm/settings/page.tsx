import PageStatement from '@/app/sslm/components/PageStatement';
import {toast} from 'sonner';
import db from "@/app/libs/db";
import {currentUser} from "@/app/libs/current-user";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";


const Page = async () => {
    const user = await currentUser()
    const setting = await db.settings.findFirst({
        where: {
            userId: user?.id
        }
    })
    const dooray = await db.dooray.findFirst({
        where: {
            settingsId: setting?.id
        }
    })

    const testMail = async () => {
        try {
            const response = await fetch(`/api/sslm/email/0/0`);
            if (response.ok) {
                const result = await response.json();
                if (result.result) toast.success('테스트 발송 성공');
                else toast.error('테스트 발송 실패(설정 수정)');
            }
        } catch (error) {
            toast.error('테스트 발송 실패');
        }
    };


    // Example function to save settings
    async function saveSettings(formData: FormData) {
        "use server"
        // Extract and validate data from formData
        const mailEmail = formData.get("mail_email") as string;
        const mailPassword = formData.get("mail_password") as string;
        const mailServer = formData.get("mail_server") as string;
        const mailPort = formData.get("mail_port") as string;
        const activeSsl = formData.get("activeSsl") === 'on' ? true : false as boolean;


        // Check for missing fields
        if (!mailEmail || !mailPassword || !mailServer || !mailPort) {
            console.error('Missing required fields');
            return;
        }

        // Assuming `user` is the current user object with an `id` property
        const userId = user?.id;

        try {
            const existingSetting = await db.settings.findFirst({
                where: {
                    userId: userId,
                },
            });

            if (existingSetting) {
                // Update existing setting
                await db.settings.update({
                    where: {
                        userId: userId,
                    },
                    data: {
                        mail_email: mailEmail,
                        mail_password: mailPassword,
                        mail_server: mailServer,
                        mail_port: mailPort,
                        activeSsl: activeSsl,
                    },
                });
            } else {
                // Create new setting
                await db.settings.create({
                    data: {
                        mail_email: mailEmail,
                        mail_password: mailPassword,
                        mail_server: mailServer,
                        mail_port: mailPort,
                        activeSsl: activeSsl,
                        userId: userId, // Ensure this matches your schema's field name for associating the setting with a user
                    },
                });
            }
            console.log('Settings saved successfully');
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    }

    const saveApi = async (formData: FormData) => {
        'use server'
        const dooray_token = formData.get("dooray_token") as string;
        const dooray = await db.dooray.findFirst({
            where: {
                settingsId: setting?.id
            }
        })
        if (dooray) {
            await db.dooray.update({
                data: {
                    token: dooray_token
                },
                where: {
                    settingsId: setting?.id
                }
            })
        } else {
            await db.dooray.create({
                data: {
                    token: dooray_token,
                    settingsId: setting?.id
                }
            })
        }
    }


    return (
        <div className={'flex w-full flex-col gap-2 p-4'}>
            <div>
                <PageStatement
                    header={'이메일 발송 정보'}
                    context={'이메일 발송 계정을 설정하고 테스트를 할 수 있습니다.'}
                />

                <form className={"space-y-6"} action={saveSettings}>
                    <div className={' gap-2 grid grid-cols-2'}>
                        <div className={'flex flex-col'}>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-gray-900"
                            >
                                이메일 주소
                            </label>
                            <Input
                                type="email"
                                id="mail_email"
                                name={"mail_email"}
                                defaultValue={setting?.mail_email}
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="test@test.com"
                            />
                        </div>

                        <div className={'flex flex-col'}>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-gray-900"
                            >
                                이메일 비밀번호
                            </label>
                            <Input
                                type="password"
                                id="mail_password"
                                name={'mail_password'}
                                defaultValue={setting?.mail_password}
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="*****"
                            />
                        </div>
                        <div className={'flex flex-col'}>
                            <label
                                htmlFor="smtp"
                                className="mb-2 block text-sm font-medium text-gray-900"
                            >
                                발신서버(SMTP) 주소
                            </label>
                            <Input
                                type="text"
                                id="mail_server"
                                name={'mail_server'}
                                defaultValue={setting?.mail_server}
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="smtp.dooray.com"
                            />
                        </div>
                        <div className={'flex flex-col'}>
                            <label
                                htmlFor="port"
                                className="mb-2 block text-sm font-medium text-gray-900"
                            >
                                발신서버(SMTP) 포트
                            </label>
                            <Input
                                type="text"
                                id="mail_port"
                                defaultValue={setting?.mail_port}
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="465"
                                name={'mail_port'}
                            />
                        </div>
                        <div className={'flex gap-2 justify-end col-start-2'}>
                            <label className={"flex justify-center items-center gap-2"}>
                                <span className="text-xs font-bold"> SSL</span>
                                <Checkbox
                                    id="activeSsl"
                                    name={'activeSsl'}
                                    defaultChecked={setting?.activeSsl as boolean}
                                />
                            </label>
                            <Button
                                type={'submit'}
                            >
                                저장
                            </Button>
                        </div>
                    </div>
                </form>

                <form className={"space-y-6"} action={saveApi}>
                    <div className={'flex gap-2'}>
                        <div className={'flex flex-1 flex-col'}>
                            <div className={'flex flex-1'}>
                                <PageStatement
                                    header={'Dooray API Token 등록'}
                                    context={
                                        '이름 검색 및 메시지를 보내기 위하여 Dooray API Token 정보를 입력해 주세요.'
                                    }
                                />
                            </div>
                            <div className={'flex flex-col'}>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-gray-900"
                                >
                                    Dooray API Token
                                </label>
                                <Input
                                    type="password"
                                    id={"dooray_token"}
                                    name={"dooray_token"}
                                    defaultValue={dooray?.token}
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="jp3kgvh14yt0:tpnLpHxERB-RQkYYzGif6A"
                                />
                                <div className={"flex justify-end"}>
                                    <Button

                                    >
                                        저장
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;