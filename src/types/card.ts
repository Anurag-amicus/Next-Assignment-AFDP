import type { ReactNode } from "react";

export type CardProps = {
    variant?: "elevated" | "bordered" | "flat";
    children: ReactNode;
    className?: string;
};

export type CtaCardProps = {
    title: string;
    description: string;
    buttonText: string;
    icon?: ReactNode;
    variant?: "elevated" | "bordered" | "flat";
    buttonvariant?: "primary" | "secondary" | "outline" | "danger" | "generic";
};


export const variantCardClasses = {
        elevated:
            "bg-white border border-surface shadow-[0_3px_8px_rgba(0,0,0,0.18)]",

        bordered:
            "bg-white border-2 border-subtle shadow-none",

        flat:
            "bg-surface border border-surface shadow-none",
    };


export const WHO_WE_ARE_CARDS = [
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

export const WHAT_WE_STAND_FOR_CARDS = [
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
