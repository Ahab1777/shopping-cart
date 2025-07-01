import { useState, useEffect } from 'react';
import type { Product } from '../../App';
import type { CartItem } from '../../contexts/cartContext';
import { CartContext } from '../../contexts/cartContext';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window !== 'undefined') { //Initialize locally saved cart
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];//Initialize cart as empty array if not on browser/client
    });

    //Save cart to local storage when cart changes value
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product, amount: number = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {//If item exists, change it
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + amount }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: amount }];//Add item if it does not exist on cart yet
        });
    };

    const removeFromCart = (productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const cartItemCount = cart.reduce(
        (count, item) => count + item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                cartTotal,
                cartItemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
