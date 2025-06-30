import { useState, type ChangeEvent } from "react";
import type { Product } from "../App";
import styles from './ProductCard.module.css'
import { useCart } from "../hooks/useCart";

interface ProductProps {
    product: Product;
}

const ProductCard = ({ product }: ProductProps) => {
    const { id, title, price, image, rating } = product;
    const [amount, setAmount] = useState <number>(0)
    const { addToCart } = useCart();

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const action = e.currentTarget.getAttribute("data-set");
        setAmount(prev => {
            if (action === "increment") {
                return Math.min(prev + 1, 100);
            }
            if (action === "decrement") {
                return Math.max(prev - 1, 1);
            }
            return prev;
        });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value = parseInt(e.target.value) || 0;
        if (value >= 1 && value <= 100) {
            setAmount(value)
        }
    }

    const handleAddToCart = () => {
        addToCart(product, amount);
        setAmount(1); //reset amount after adding to cart
        console.log(localStorage.getItem('cart'))
    }

    return (
        <div className={styles.productCard} data-id={id}>
            <h4>{title}</h4>
            <img src={image} alt="Product image" className={styles.cardImg} />
            <div className="info-container">
                <div className="">{price}</div>
                <div className="">{rating.rate}</div>
                <div className="number-input">
                    <button 
                    className="decrement-btn" 
                    aria-label="Decrease value" 
                    data-set="decrement"
                    onClick={handleButtonClick}
                    >−</button>
                    <input 
                    type="number" 
                    value={amount}
                    onChange={handleInputChange} 
                    min="1" 
                    max="100" 
                    step="1"/>
                    <button 
                    className="increment-btn" 
                    aria-label="Increase value" 
                    data-set="increment"
                    onClick={handleButtonClick}
                    >+</button>
                    <button
                    type="submit"
                    aria-label="Add to cart"
                    onClick={handleAddToCart}
                    >Add to Cart                     
                    </button>
                </div>  
            </div>
        </div>
    )
}

export default ProductCard