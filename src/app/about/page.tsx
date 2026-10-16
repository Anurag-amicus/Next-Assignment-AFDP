import Link from "next/link";
import Button from "@/components/common/Button";
import Breadcrumb from "@/components/common/Breadcrumb";
import AboutCard from "@/components/about/AboutCard";

export const metadata = {
    title: "About Us | Online Express",
    description:
        "Learn about Online Express, our story, innovation history, mission, values, and commitments to sustainability and customer excellence.",
};

const WHO_WE_ARE_CARDS = [
    {
        title: "Our Story",
        description:
            "Discover how Online Express started with a mission to bring high-quality products, transparent pricing, and seamless shopping experiences to customers everywhere.",
        linkText: "READ OUR STORY",
        linkHref: "#story",
        imageSrc: "/about/story.jpg",
        imageAlt: "The journey and founding story of Online Express",
    },
    {
        title: "Innovation History",
        description:
            "Explore our milestones in digital retail and smart logistics, where cutting-edge technology and a customer-centric focus continually set new standards.",
        linkText: "SEE OUR TIMELINE",
        linkHref: "#innovation",
        imageSrc: "/about/innovation.jpg",
        imageAlt: "Innovation and technological growth at Online Express",
    },
    {
        title: "Corporate Locations",
        description:
            "Online Express operates advanced fulfillment hubs, corporate offices, and distribution networks strategically positioned to support customers worldwide.",
        linkText: "VIEW OUR LOCATIONS",
        linkHref: "#locations",
        imageSrc: "/about/locations.jpg",
        imageAlt: "Global fulfillment and corporate distribution map",
    },
];

const WHAT_WE_STAND_FOR_CARDS = [
    {
        title: "Mission and Values",
        description:
            "At Online Express, our core values guide every decision and interaction. We operate from a 'people first' philosophy focused on bringing value to everyday lives.",
        linkText: "LEARN ABOUT OUR VALUES",
        linkHref: "#mission",
        imageSrc: "/about/mission.jpg",
        imageAlt: "Our team collaborating with shared mission and values",
    },
    {
        title: "Sustainability",
        description:
            "Protecting the environment is fundamental to our business. We are committed to eco-friendly packaging, reducing logistics emissions, and promoting sustainable products.",
        linkText: "SUSTAINABILITY EFFORTS",
        linkHref: "#sustainability",
        imageSrc: "/about/sustainability.jpg",
        imageAlt: "Renewable energy and eco-friendly sustainability initiatives",
    },
    {
        title: "Corporate Social Responsibility",
        description:
            "We foster positive community impact through social initiatives, partnering with local organizations, and empowering educational and welfare programs.",
        linkText: "CORPORATE RESPONSIBILITY",
        linkHref: "#csr",
        imageSrc: "/about/csr.jpg",
        imageAlt: "Community care and corporate social responsibility",
    },
];

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

                    <Link href="#who-we-are">
                        <Button
                            variant="outline"
                            className="w-auto px-7 h-11 text-xs font-bold uppercase tracking-wider rounded-xs"
                        >
                            Our Story
                        </Button>
                    </Link>
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
