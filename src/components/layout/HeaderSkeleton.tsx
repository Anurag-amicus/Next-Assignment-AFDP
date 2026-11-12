export default function HeaderSkeleton() {
    return (
        <header className="w-full border-b border-border bg-white sticky top-0 z-40 overflow-x-clip animate-pulse" aria-hidden="true">
            <div className="w-full bg-white px-7 py-3 max-[1100px]:px-5 max-[768px]:px-4 max-[600px]:px-3 max-[600px]:py-2.5">
                <div className="flex items-center w-full min-h-12 max-[600px]:min-h-10">
                    {/* Mobile Hamburger placeholder */}
                    <div className="mr-3 h-8 w-8 shrink-0 rounded-xs bg-gray-100 max-[768px]:mr-2 max-[600px]:mr-1.5" />

                    {/* Logo placeholder */}
                    <div className="flex w-45 shrink-0 flex-col justify-center border-l border-border-dark pl-4.5 max-[1100px]:w-40 max-[768px]:w-auto max-[768px]:pl-2.5 max-[600px]:pl-2">
                        <div className="h-2.5 w-12 bg-gray-200 rounded-xs mb-1.5 max-[768px]:w-9" />
                        <div className="h-6 w-24 bg-gray-200 rounded-xs max-[1100px]:h-5 max-[768px]:h-4.5 max-[768px]:w-20" />
                    </div>

                    {/* Desktop Search bar placeholder */}
                    <div className="ml-10 mr-8 hidden min-[600px]:flex h-10.5 min-w-0 max-w-162.5 flex-1 items-center justify-between rounded-sm border border-border-dark bg-gray-50/50 px-3.5 max-[1100px]:ml-6 max-[1100px]:mr-4 max-[768px]:mx-3 max-[768px]:h-9.5">
                        <div className="h-3.5 w-32 bg-gray-200 rounded-xs" />
                        <div className="h-4 w-4 bg-gray-200 rounded-xs" />
                    </div>

                    {/* Nav actions placeholder */}
                    <nav className="ml-auto flex shrink-0 items-center gap-6 max-[1100px]:gap-4 max-[768px]:gap-3">
                        <div className="h-3.5 w-11 bg-gray-200 rounded-xs max-[768px]:hidden" />
                        <div className="h-3.5 w-14 bg-gray-200 rounded-xs max-[768px]:hidden" />
                        <div className="h-3.5 w-11 bg-gray-200 rounded-xs max-[768px]:hidden" />

                        {/* Cart placeholder */}
                        <div className="flex items-center gap-1.5 pr-1.5">
                            <div className="h-5 w-5 rounded-full bg-gray-200" />
                            <div className="h-3.5 w-8 bg-gray-200 rounded-xs max-[768px]:hidden" />
                        </div>

                        {/* Profile placeholder */}
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-gray-200 shrink-0" />
                            <div className="h-3.5 w-14 bg-gray-200 rounded-xs max-[900px]:hidden" />
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}

