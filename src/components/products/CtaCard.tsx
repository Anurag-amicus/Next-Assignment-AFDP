import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import type { CtaCardProps } from "@/types/card";

function CtaCard({
    title,
    description,
    buttonText,
    icon,
    variant,
    buttonvariant = "primary"
}: CtaCardProps) {
    return (
        <Card
            variant={variant}
            className="min-w-0 p-0 rounded-xs flex h-full"
        >
            <div className="flex w-full h-full flex-col items-start px-6 py-7">
                {icon && (
                    <div className="mb-3">
                        {icon}
                    </div>
                )}

                <h2 className="m-0 text-black font-sans text-3xl font-bold leading-[1.1] tracking-tight">
                    {title}
                </h2>

                <p className="mx-0 mt-3.5 mb-6 font-sans text-muted text-sm leading-normal">
                    {description}
                </p>

                <Button
                    variant={buttonvariant}
                    className="w-34 h-10.5 mt-auto mx-auto font-display text-base tracking-wider shrink-0"
                >
                    {buttonText}
                </Button>
            </div>
        </Card>
    );
}

export default CtaCard;