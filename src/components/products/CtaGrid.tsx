import CtaCard from "./CtaCard";

function CtaGrid() {
    return (
        <section className="w-full px-6 pt-13.75 pb-7.5 max-[520px]:px-4.5 max-[520px]:py-10">

            <div className="grid w-full max-w-287.5 mx-auto grid-cols-4 items-stretch gap-4.5 max-[900px]:grid-cols-2 max-[520px]:grid-cols-[1fr]">

                <CtaCard
                    variant="elevated"
                    title="Shop Products"
                    description="Browse our collection of quality products for everyday needs."
                    buttonText="Shop Now"
                />

                <CtaCard
                    variant="flat"
                    title="New Arrivals"
                    description="Discover the latest products added to our collection."
                    buttonText="Explore"
                />

                <CtaCard
                    variant="elevated"
                    title="Featured Items"
                    description="Take a look at some of our most popular products."
                    buttonText="View Items"
                />

                <CtaCard
                    variant="flat"
                    title="Special Offers"
                    description="Find selected products and discover great deals."
                    buttonText="View Offers"
                />

            </div>

        </section>
    );
}

export default CtaGrid;