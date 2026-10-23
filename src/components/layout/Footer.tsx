import Link from "next/link";
import Image from "next/image";

function Footer() {
    return (
        <footer className="w-full">
            {/* =========================
                Trust Bar
                ========================= */}
            <div className="w-full bg-charcoal py-8 px-6 max-[600px]:py-7 max-[600px]:px-4">
                <div className="mx-auto w-full max-w-287.5 grid grid-cols-3 gap-12.5 max-[900px]:gap-6.25 max-[600px]:grid-cols-1 max-[600px]:gap-6">
                    <div className="flex items-center gap-3.5">
                        <div className="flex w-12 h-12 shrink-0 items-center justify-center text-white text-2xl leading-none">
                            <Image
                                src="/cardlogo.svg"
                                alt="Secure Payments"
                                width={38}
                                height={38}
                                className="w-9.5 h-9.5 object-contain filter-[brightness(0)_invert(1)]"
                            />
                        </div>

                        <div>
                            <h3 className="m-0 mb-1 text-white font-display text-lg font-medium leading-none tracking-wide max-[600px]:text-base">
                                SECURE PAYMENTS
                            </h3>
                            <p className="m-0 text-border-dark text-xs leading-normal">
                                Safe and secure checkout
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3.5">
                        <div className="flex w-12 h-12 shrink-0 items-center justify-center text-white text-2xl leading-none">
                            <Image
                                src="/helpcenterlogo.svg"
                                alt="Help Center"
                                width={38}
                                height={38}
                                className="w-9.5 h-9.5 object-contain filter-[brightness(0)_invert(1)]"
                            />
                        </div>

                        <div>
                            <h3 className="m-0 mb-1 text-white font-display text-lg font-medium leading-none tracking-wide max-[600px]:text-base">
                                HELP CENTER
                            </h3>
                            <p className="m-0 text-border-dark text-xs leading-normal">
                                We are here when you need us
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3.5">
                        <div className="flex w-12 h-12 shrink-0 items-center justify-center text-white text-2xl leading-none">
                            <Image
                                src="/trucklogo.svg"
                                alt="Reliable Shipping"
                                width={38}
                                height={38}
                                className="w-9.5 h-9.5 object-contain filter-[brightness(0)_invert(1)]"
                            />
                        </div>

                        <div>
                            <h3 className="m-0 mb-1 text-white font-display text-lg font-medium leading-none tracking-wide max-[600px]:text-base">
                                RELIABLE SHIPPING
                            </h3>
                            <p className="m-0 text-border-dark text-xs leading-normal">
                                Fast and dependable delivery
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* =========================
                Main Footer
                ========================= */}
            <div className="w-full bg-gray-50 pt-9 px-6 pb-10 max-[600px]:pt-8 max-[600px]:pb-8 max-[600px]:px-4">
                <div className="mx-auto w-full max-w-287.5 grid grid-cols-[1fr_1fr_1fr_1.8fr] gap-12 max-[900px]:grid-cols-2 max-[900px]:gap-y-8 max-[600px]:grid-cols-2 max-[600px]:gap-y-8 max-[600px]:gap-x-5 max-[420px]:grid-cols-1">
                    <div className="flex flex-col items-start">
                        <h3 className="m-0 mb-4 text-dark font-display text-xs font-extrabold leading-none tracking-wider">
                            QUICK LINKS
                        </h3>

                        <Link href="/" className="mb-2.5 text-xs text-muted font-medium hover:text-orange transition-colors duration-150">Home</Link>
                        <Link href="/about" className="mb-2.5 text-xs text-muted font-medium hover:text-orange transition-colors duration-150">About Us</Link>
                        <Link href="/products" className="mb-2.5 text-xs text-muted font-medium hover:text-orange transition-colors duration-150">Products</Link>
                        <Link href="/products" className="mb-2.5 text-xs text-muted font-medium hover:text-orange transition-colors duration-150">Categories</Link>
                    </div>

                    <div className="flex flex-col items-start">
                        <h3 className="m-0 mb-4 text-dark font-display text-xs font-extrabold leading-none tracking-wider">
                            SHOP
                        </h3>

                        <Link href="/products?category=Electronics" className="mb-2.5 text-xs text-muted font-medium hover:text-orange transition-colors duration-150">Electronics</Link>
                        <Link href="/products?category=Fashion" className="mb-2.5 text-xs text-muted font-medium hover:text-orange transition-colors duration-150">Fashion</Link>
                        <Link href="/products?category=Home%20%26%20Kitchen" className="mb-2.5 text-xs text-muted font-medium hover:text-orange transition-colors duration-150">Home & Kitchen</Link>
                    </div>

                    <div className="flex flex-col items-start">
                        <h3 className="m-0 mb-4 text-dark font-display text-xs font-extrabold leading-none tracking-wider">
                            SUPPORT
                        </h3>

                        <Link href="/" className="mb-2.5 text-xs text-muted font-medium hover:text-orange transition-colors duration-150">Help Center</Link>
                        <Link href="/" className="mb-2.5 text-xs text-muted font-medium hover:text-orange transition-colors duration-150">Shipping Information</Link>
                        <Link href="/" className="mb-2.5 text-xs text-muted font-medium hover:text-orange transition-colors duration-150">Returns & Refunds</Link>
                    </div>

                    <div className="max-w-77.5 max-[900px]:max-w-full max-[420px]:max-w-full">
                        <p className="m-0 mb-3 text-dark text-xs font-semibold leading-normal">
                            Copyright © 2026 Online Express
                        </p>

                        <p className="m-0 text-muted text-xs leading-relaxed">
                            Online Express brings quality products together in one simple shopping experience. Discover everyday essentials across electronics, fashion, home, and more.
                        </p>
                    </div>
                </div>
            </div>

            {/* =========================
                Bottom Footer
                ========================= */}
            <div className="w-full bg-white py-0 px-6 border-t border-border max-[600px]:px-4">
                <div className="mx-auto w-full max-w-287.5 min-h-16 py-4 grid grid-cols-3 items-center max-[900px]:grid-cols-1 max-[900px]:gap-4 max-[900px]:justify-items-center">
                    <div className="flex items-center gap-3.5 max-[900px]:justify-center">
                        <Link href="/" aria-label="Facebook" className="text-muted text-lg font-bold leading-none hover:text-orange transition-colors duration-150">
                            f
                        </Link>
                        <Link href="/" aria-label="Instagram" className="text-muted text-lg font-bold leading-none hover:text-orange transition-colors duration-150">
                            ◎
                        </Link>
                        <Link href="/" aria-label="LinkedIn" className="text-muted text-lg font-bold leading-none hover:text-orange transition-colors duration-150">
                            in
                        </Link>
                        <Link href="/" aria-label="X" className="text-muted text-lg font-bold leading-none hover:text-orange transition-colors duration-150">
                            X
                        </Link>
                    </div>

                    <div className="flex items-center justify-center gap-2 whitespace-nowrap text-xs text-muted max-[420px]:flex-wrap">
                        <Link href="/" className="text-muted font-medium hover:text-orange transition-colors">Terms of Use</Link>
                        <span className="text-border select-none">|</span>
                        <Link href="/" className="text-muted font-medium hover:text-orange transition-colors">Contact Us</Link>
                        <span className="text-border select-none">|</span>
                        <Link href="/" className="text-muted font-medium hover:text-orange transition-colors">Privacy Policy</Link>
                    </div>

                    <Link href="/" className="justify-self-end max-[900px]:justify-self-center text-dark font-display text-base font-extrabold tracking-wider hover:text-orange transition-colors">
                        ONLINE EXPRESS
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;