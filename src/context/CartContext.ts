import { createContext} from "react";
import { CartContextType } from "@/types/cart";

export const CartCountContext = createContext<CartContextType | null>(null);