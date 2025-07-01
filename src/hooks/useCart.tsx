import { useContext } from 'react';
import { CartContext } from '../contexts/cartContext';
import type { CartContextType } from '../contexts/cartContext';

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider component');
    }
    return context;
};