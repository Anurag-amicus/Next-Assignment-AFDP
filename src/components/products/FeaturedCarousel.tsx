"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

import Arrow from "@/components/common/Arrow";
import ProductCard from "@/components/products/ProductCard";
import type { FeaturedCarouselProps, Product } from "@/types/product";
import productsData from "@/data/products.json";
import { apiService } from "@/services/apiService";
import { transformProducts } from "@/utils/dataTransformation";

function FeaturedCarousel({ onAddToCart }: FeaturedCarouselProps = {}) {
    const [products, setProducts] = useState<Product[]>(() => productsData.slice(0, 8));

    useEffect(() => {
        let isMounted = true;
        apiService.getProducts({ Page: 1, PageSize: 8 }).then((res) => {
            if (isMounted && res.success && res.data?.products?.length) {
                setProducts(transformProducts(res.data.products));
            }
        }).catch(() => {
            // Keep initial fallback products
        });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section className="w-full bg-white px-6 pt-7.5 pb-2.5 max-[768px]:pt-11.25 max-[768px]:px-4.5 max-[768px]:pb-15">
            <div className="mx-auto w-full max-w-287.5">
                <h2 className="m-0 mb-7.5 text-black font-display text-3xl font-extrabold leading-tight tracking-tight text-center max-[768px]:text-2xl max-[768px]:mb-6 max-[480px]:text-xl">
                    Featured Products
                </h2>

                <div className="relative w-full [&_.swiper]:w-full [&_.swiper-slide]:h-auto [&_.swiper-slide]:flex [&_.swiper-slide>*]:w-full">
                    <Arrow
                        direction="left"
                        className="featured-arrow-prev absolute top-1/2 -mt-6.25 w-12 h-12 -left-8.5 max-[768px]:w-6 max-[768px]:h-6 max-[768px]:left-0.5"
                        ariaLabel="Previous products"
                    />

                    <div className="w-full overflow-hidden">
                        <Swiper
                            modules={[Navigation, Pagination]}
                            slidesPerView={4}
                            slidesPerGroup={1}
                            spaceBetween={16}
                            loop={true}
                            navigation={{
                                prevEl: ".featured-arrow-prev",
                                nextEl: ".featured-arrow-next",
                            }}
                            pagination={{
                                el: ".featured-pagination",
                                clickable: true,
                            }}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                    spaceBetween: 16,
                                },
                                600: {
                                    slidesPerView: 2,
                                    spaceBetween: 16,
                                },
                                900: {
                                    slidesPerView: 3,
                                    spaceBetween: 16,
                                },
                                1200: {
                                    slidesPerView: 4,
                                    spaceBetween: 16,
                                },
                            }}
                        >
                            {products.map((product) => (
                                <SwiperSlide key={product.id}>
                                    <ProductCard
                                        {...product}
                                        onAddToCart={onAddToCart}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <Arrow
                        direction="right"
                        className="featured-arrow-next absolute top-1/2 -mt-6.25 w-12 h-12 -right-8.5 max-[768px]:w-6 max-[768px]:h-6 max-[768px]:right-0.5"
                        ariaLabel="Next products"
                    />
                </div>

                {/* Pagination dots container rendered below the carousel */}
                <div className="featured-pagination static flex justify-center items-center mt-6 min-h-3 [&_.swiper-pagination-bullet]:w-3 [&_.swiper-pagination-bullet]:h-3 [&_.swiper-pagination-bullet]:mx-1 [&_.swiper-pagination-bullet]:bg-subtle [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:cursor-pointer [&_.swiper-pagination-bullet-active]:bg-orange" />
            </div>
        </section>
    );
}

export default FeaturedCarousel;