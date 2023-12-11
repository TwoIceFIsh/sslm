'use client';
import { toast } from 'react-hot-toast';
import UserInfo from '@/app/types/UserInfo';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = ({ params }: { params: { userId: string } }) => {
    const [user, setUser] = useState<UserInfo>({
        userEmail: '',
        userName: '',
        userPassword: '',
        userId: '',
    });

    const router = useRouter();

    const saveUserInfo = async () => {
        if (user.userPassword === '') {
            toast.error('비밀번호를 입력해주세요.');
            return;
        }

        // Perform any necessary validation before saving the user info

        const data = await fetch('/api/sslm/user/update', {
            method: 'POST',
            body: JSON.stringify(user),
        });
        const result = await data.json();
        if (result.result) {
            toast.success('회원 수정 성공');
            router.push('/sslm/user');
        } else toast.error('회원 수정 실패');
    };

    const getUserInfo = async () => {
        const res = await fetch(`/api/sslm/user/${params.userId}`);
        const data = await res.json();
        setUser(data);
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <div className={'flex h-full w-64 flex-col justify-center gap-4   bg-white p-4 text-xs'}>
            <div className={'flex justify-between border'}>
                <div className={'w-full flex-col bg-red-100 text-center'}>이메일</div>
                <div className={'mx-2 w-full flex-col bg-gray-100'}>
                    <input
                        name="userEmail"
                        value={user?.userEmail}
                        disabled={true}
                        placeholder={'이메일'}
                        onChange={(e) => setUser({ ...user, userEmail: e.target.value })}
                    />
                </div>
            </div>

            <div className={'flex justify-between border'}>
                <div className={'w-full flex-col bg-red-100 text-center'}>이름</div>
                <div className={'mx-2 w-full flex-col bg-gray-100'}>
                    <input
                        name="userName"
                        defaultValue={user?.userName}
                        placeholder={'이름'}
                        onChange={(e) => setUser({ ...user, userName: e.target.value })}
                    />
                </div>
            </div>
            <div className={'flex justify-between border'}>
                <div className={'w-full flex-col bg-red-100 text-center'}>비밀번호</div>
                <div className={'mx-2 w-full flex-col bg-gray-100'}>
                    <input
                        name="userPassword"
                        type={'password'}
                        defaultValue={''}
                        placeholder={'비밀번호'}
                        onChange={(e) => setUser({ ...user, userPassword: e.target.value })}
                    />
                </div>
            </div>

            <div className={'flex items-center justify-center gap-2'}>
                <div
                    className={
                        'w-12 cursor-pointer select-none rounded-md border bg-green-300 p-1 text-center font-bold'
                    }
                    onClick={() => saveUserInfo()}
                >
                    확인
                </div>
                <div
                    className={
                        'w-12 cursor-pointer select-none rounded-md border bg-yellow-300 p-1 text-center font-bold'
                    }
                    onClick={() => router.push('/sslm/user')}
                >
                    취소
                </div>
            </div>
        </div>
    );
};

export default Page;
