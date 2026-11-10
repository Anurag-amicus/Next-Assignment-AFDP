export function CategoryGridSkeleton() {
    return (
        <section className="w-full bg-white px-6 py-10 animate-pulse">
            <div className="mx-auto w-full max-w-287.5 text-center">
                <div className="h-7 w-48 mx-auto bg-gray-200 rounded-xs mb-8" />
                <div className="grid grid-cols-3 gap-6 max-[768px]:grid-cols-1">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-44 bg-surface/70 border border-border rounded-xs" />
                    ))}
                </div>
            </div>
        </section>
    );
}