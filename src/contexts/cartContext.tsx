import { createContext } from 'react';
import type { Product } from '../App';

export interface CartItem extends Product {
    quantity: number;
}

export interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartItemCount: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);