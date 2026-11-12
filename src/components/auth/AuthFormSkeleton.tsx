export default function AuthFormSkeleton({ isRegister = false }: { isRegister?: boolean }) {
    return (
        <div
            className="w-full max-w-120 bg-white px-8 py-10 sm:px-12 sm:py-12 border border-border shadow-xs rounded-xs animate-pulse"
            aria-hidden="true"
        >
            {/* Title & subtitle placeholders */}
            <div className="flex flex-col items-center mb-6">
                <div className="h-7 w-44 bg-gray-200 rounded-xs mb-2.5" />
                <div className="h-3 w-64 max-w-full bg-gray-100 rounded-xs" />
            </div>

            {/* Form Fields placeholders */}
            <div className="flex flex-col gap-4">
                {isRegister && (
                    <div>
                        <div className="h-3.5 w-24 bg-gray-200 rounded-xs mb-2" />
                        <div className="w-full h-11 bg-gray-50 border border-border-input rounded-xs" />
                    </div>
                )}

                <div>
                    <div className="h-3.5 w-28 bg-gray-200 rounded-xs mb-2" />
                    <div className="w-full h-11 bg-gray-50 border border-border-input rounded-xs" />
                </div>

                <div>
                    <div className="h-3.5 w-20 bg-gray-200 rounded-xs mb-2" />
                    <div className="w-full h-11 bg-gray-50 border border-border-input rounded-xs" />
                </div>

                {isRegister && (
                    <div>
                        <div className="h-3.5 w-36 bg-gray-200 rounded-xs mb-2" />
                        <div className="w-full h-11 bg-gray-50 border border-border-input rounded-xs" />
                    </div>
                )}

                {/* Submit button placeholder */}
                <div className="w-full h-11 bg-gray-200 rounded-xs mt-2" />
            </div>

            {/* Bottom link placeholder */}
            <div className="h-3.5 w-48 bg-gray-100 rounded-xs mx-auto mt-6" />
        </div>
    );
}

