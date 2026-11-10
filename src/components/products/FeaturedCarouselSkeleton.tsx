export function FeaturedCarouselSkeleton() {
    return (
        <section className="w-full bg-surface/30 px-6 py-10 animate-pulse">
            <div className="mx-auto w-full max-w-287.5">
                <div className="flex items-center justify-between mb-6">
                    <div className="h-6 w-44 bg-gray-200 rounded-xs" />
                    <div className="h-4 w-20 bg-gray-100 rounded-xs" />
                </div>
                <div className="grid grid-cols-4 gap-4 max-[1024px]:grid-cols-3 max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white border border-border rounded-xs p-4 flex flex-col gap-3">
                            <div className="w-full aspect-square bg-gray-100 rounded-xs" />
                            <div className="h-4 w-3/4 bg-gray-200 rounded-xs" />
                            <div className="h-4 w-1/2 bg-gray-100 rounded-xs" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}