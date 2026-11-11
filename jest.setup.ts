import "@testing-library/jest-dom";
import React from "react";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next/image so <Image /> renders standard <img> with src and alt in JSDOM
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, priority, fill, blurDataURL, placeholder, ...props }: any) => {
    const resolvedSrc = typeof src === "object" ? src.src || "/product-placeholder.svg" : src;
    return React.createElement("img", { src: resolvedSrc, alt, ...props });
  },
}));

// Mock next/cache for Server Actions
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
  revalidateTag: jest.fn(),
}));
