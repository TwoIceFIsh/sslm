export default async function AuthLayout({children}: { children: React.ReactNode }) {

    return (
        <div className="flex flex-col justify-center items-center h-screen w-full">
            <div className="flex items-center h-full overflow-hidden  w-full justify-center">{children}</div>
        </div>
    );
};