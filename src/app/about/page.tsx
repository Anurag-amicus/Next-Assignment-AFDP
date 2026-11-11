import Button from "@/components/common/Button";
import Breadcrumb from "@/components/common/Breadcrumb";
import AboutCard from "@/components/about/AboutCard";
import { WHO_WE_ARE_CARDS, WHAT_WE_STAND_FOR_CARDS } from "@/types/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Learn about Online Express, our story, innovation history, mission, values, and commitments to sustainability and customer excellence.",
};


export default function AboutPage() {
    return (
        <div className="w-full bg-white pb-20">
            {/* 1. Hero Section */}
            <section
                className="relative w-full min-h-60 sm:min-h-70 bg-charcoal bg-cover bg-center py-12 sm:py-16 px-6"
                style={{
                    backgroundImage: `linear-gradient(90deg, rgba(17, 24, 39, 0.88) 0%, rgba(17, 24, 39, 0.72) 45%, rgba(17, 24, 39, 0.4) 100%), url(/herosection.png)`,
                }}
            >
                <div className="mx-auto max-w-287.5">
                    {/* Breadcrumb */}
                    <Breadcrumb variant="light" className="mb-4 uppercase tracking-wider text-xs" />

                    {/* Page Heading */}
                    <h1 className="m-0 font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                        About Online Express
                    </h1>
                </div>
            </section>

            {/* 2. Intro Section */}
            <section id="story" className="w-full py-12 sm:py-16 px-6">
                <div className="mx-auto max-w-287.5">
                    <h2 className="m-0 mb-6 font-display text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
                        Delivering Quality &amp; Trust Worldwide
                    </h2>

                    <div className="max-w-260 space-y-4 text-sm sm:text-base leading-relaxed text-muted mb-8">
                        <p className="m-0">
                            As a premier online destination for curated products and everyday essentials, Online Express has been elevating customer experience through dependable quality, honest value, and world-class service. Our customers are our greatest priority, and we remain steadfast in our commitment to deliver solutions that exceed expectations.
                        </p>
                        <p className="m-0">
                            Whether you need premium electronics, reliable home goods, modern apparel, or lifestyle essentials, you can rely on Online Express to help you find what you need quickly, efficiently, and safely.
                        </p>
                    </div>

                    <Button
                        href="#who-we-are"
                        variant="outline"
                        className="w-auto px-7 h-11 text-xs font-bold uppercase tracking-wider rounded-xs"
                    >
                        Our Story
                    </Button>
                </div>
            </section>

            {/* 3. Who We Are Section */}
            <section id="who-we-are" className="w-full py-10 px-6">
                <div className="mx-auto max-w-287.5">
                    <h2 className="m-0 mb-10 text-center font-display text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
                        Who We Are
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {WHO_WE_ARE_CARDS.map((card) => (
                            <AboutCard
                                key={card.title}
                                title={card.title}
                                description={card.description}
                                linkText={card.linkText}
                                linkHref={card.linkHref}
                                imageSrc={card.imageSrc}
                                imageAlt={card.imageAlt}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. What We Stand For Section */}
            <section id="what-we-stand-for" className="w-full py-10 px-6">
                <div className="mx-auto max-w-287.5">
                    <h2 className="m-0 mb-10 text-center font-display text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
                        What We Stand For
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {WHAT_WE_STAND_FOR_CARDS.map((card) => (
                            <AboutCard
                                key={card.title}
                                title={card.title}
                                description={card.description}
                                linkText={card.linkText}
                                linkHref={card.linkHref}
                                imageSrc={card.imageSrc}
                                imageAlt={card.imageAlt}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
