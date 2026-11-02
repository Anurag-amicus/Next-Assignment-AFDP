export default function CartSkeleton() {
    return (
        <div className="flex flex-col gap-3">
            {[1, 2, 3].map((key) => (
                <div
                    key={key}
                    className="grid grid-cols-12 items-center gap-4 bg-white p-4 border border-border rounded-xs animate-pulse max-[640px]:grid-cols-1"
                >
                    <div className="col-span-5 flex items-center gap-3.5 max-[640px]:col-span-1">
                        <div className="h-18 w-18 shrink-0 rounded-xs bg-surface" />
                        <div className="flex-1 flex flex-col gap-2">
                            <div className="h-4 w-4/5 rounded-xs bg-surface" />
                            <div className="h-3 w-14 rounded-xs bg-surface" />
                        </div>
                    </div>

                    <div className="col-span-2 flex justify-center max-[640px]:col-span-1 max-[640px]:justify-start">
                        <div className="h-4 w-16 rounded-xs bg-surface" />
                    </div>

                    <div className="col-span-3 flex justify-center max-[640px]:col-span-1 max-[640px]:justify-start">
                        <div className="h-8 w-26 rounded-xs bg-surface" />
                    </div>

                    <div className="col-span-2 flex justify-end max-[640px]:col-span-1 max-[640px]:justify-start">
                        <div className="h-5 w-20 rounded-xs bg-surface" />
                    </div>
                </div>
            ))}
        </div>
    );
}
