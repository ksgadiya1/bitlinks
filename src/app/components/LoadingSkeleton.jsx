export default function LoadingSkeleton({ count = 6 }) {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-minimal"
                >
                    {/* Image skeleton */}
                    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg skeleton mb-4" />

                    {/* Title skeleton */}
                    <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded skeleton mb-3 w-3/4" />

                    {/* Description skeleton */}
                    <div className="space-y-2 mb-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded skeleton w-5/6" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded skeleton w-4/6" />
                    </div>

                    {/* Meta skeleton (date, time) */}
                    <div className="flex gap-4 mb-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded skeleton w-24" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded skeleton w-20" />
                    </div>

                    {/* Button skeleton */}
                    <div className="flex gap-3">
                        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg skeleton w-28" />
                        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg skeleton w-10" />
                        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg skeleton w-10" />
                    </div>
                </div>
            ))}
        </>
    );
}
