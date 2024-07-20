import {LoginComponent} from "@/app/(site)/components/LoginComponent";

const AuthPage = async () => {
    return (
        <div className={"w-full items-center flex flex-col"}>
            <div className="py-10 ">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    {process.env.NEXT_PUBLIC_APP_NAME} {process.env.NEXT_PUBLIC_VERSION}
                </h1>
            </div>
            <LoginComponent/>
        </div>
    );
};

export default AuthPage;