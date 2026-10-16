import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";

export interface AboutCardProps {
    imageSrc: string;
    imageAlt: string;
    title: string;
    description: string;
    linkText: string;
    linkHref?: string;
    className?: string;
}

export default function AboutCard({
    imageSrc,
    imageAlt,
    title,
    description,
    linkText,
    linkHref = "#",
    className,
}: AboutCardProps) {
    return (
        <article
            className={cn(
                "group flex h-full flex-col overflow-hidden rounded-xs border border-border bg-white transition-shadow duration-200 hover:shadow-md",
                className
            )}
        >
            {/* Card Image */}
            <div className="relative aspect-16/10 w-full overflow-hidden bg-surface">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                    className="object-cover transition-transform duration-300 group-hover:scale-103"
                />
            </div>

            {/* Card Content */}
            <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                <div>
                    <h3 className="m-0 mb-3 font-display text-2xl font-extrabold text-charcoal tracking-tight">
                        {title}
                    </h3>
                    <p className="m-0 text-sm leading-relaxed text-muted">
                        {description}
                    </p>
                </div>

                <div className="mt-6 pt-2">
                    <Link
                        href={linkHref}
                        className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-orange hover:text-orange-dark hover:underline transition-colors"
                    >
                        {linkText}
                    </Link>
                </div>
            </div>
        </article>
    );
}
