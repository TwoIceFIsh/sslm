'use client';

import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import Input from '@/app/sslm/components/inputs/Input';
import Button from '@/app/sslm/components/Button';
import { toast } from 'react-hot-toast';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/sslm');
        }
    }, [session?.status, router]);

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === 'REGISTER') {
            axios
                .post('/api/register', data)
                .then((callback) => {
                    if (callback.data) {
                        toast.success('회원가입 성공(관리자 승인 필요)');
                        setVariant('LOGIN');
                    }
                })
                .catch(() => toast.error('서버 통신 실패'))
                .finally(() => setIsLoading(false));
        }

        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false,
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error('계정정보 확인 또는 관리자 승인필요');
                    }

                    if (callback?.ok) {
                        toast.success('로그인 성공');
                        router.push('/sslm');
                    }
                })
                .finally(() => setIsLoading(false));
        }
    };

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div
                className="
                            bg-white
                              px-4
                              py-8
                              shadow
                              sm:rounded-lg
                              sm:px-10
        "
            >
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {variant === 'REGISTER' && (
                        <Input
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                            id="name"
                            label="이름"
                        />
                    )}
                    <Input
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                        id="email"
                        label="이메일 주소"
                        type="email"
                    />
                    <Input
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                        id="password"
                        label="비밀번호"
                        type="password"
                    />
                    <div>
                        <Button disabled={isLoading} fullWidth type="submit">
                            {variant === 'LOGIN' ? '로그인' : '회원가임'}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div
                            className="
                absolute
                inset-0
                flex
                items-center
              "
                        >
                            <div className="mb-4 w-full border-t border-gray-300" />
                        </div>
                    </div>
                </div>
                <div
                    className="
            mt-6
            flex
            justify-center
            gap-2
            px-2
            text-sm
            text-gray-500
          "
                >
                    <div>
                        {variant === 'LOGIN' ? '계정이 필요 하신가요?' : '이미 계정이 있으신가요?'}
                    </div>
                    <div onClick={toggleVariant} className="cursor-pointer underline">
                        {variant === 'LOGIN' ? '계정 생성' : '로그인'}
                    </div>
                </div>
            </div>
            <div className={'mt-3 text-center text-sm'}>
                최초 가입 후 로그인 시 담당자의 승인이 필요합니다.
            </div>
        </div>
    );
};

export default AuthForm;
