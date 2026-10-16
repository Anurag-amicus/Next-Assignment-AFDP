export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full flex-1 bg-surface py-12 px-4 sm:px-6 flex flex-col justify-center items-center min-h-[75vh]">
            {children}
        </div>
    );
}
