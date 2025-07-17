import { useState, type ChangeEvent, memo } from "react";
import type { Product } from "../../App";
import styles from './ProductCard.module.css'
import { useCart } from "../../hooks/useCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { createPortal } from "react-dom";
import Toast from "../Toast/Toast";


interface ProductProps {
    product: Product;
}

const ProductCard = ({ product }: ProductProps) => {
    const { id, title, price, image, rating } = product;
    const [amount, setAmount] = useState <number>(1)
    const { addToCart } = useCart();
    const [isToastOpen, setIsToastOpen] = useState<boolean>(false)

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
        setIsToastOpen(true)
    }

    const portalTarget = document.getElementById('portal-root')

    return (
        <div className={styles.productCard} data-id={id} aria-label={`Product card for ${title}`}>
            <h4 className={styles.title} aria-label={`Product title: ${title}`}>{title}</h4>
            <img src={image} alt={`Image of ${title}`} className={styles.cardImg} aria-label={`Product image for ${title}`} />
            <div className={styles.infoContainer}>
                <div className={styles.price} aria-label={`Price: US$ ${price}`}>
                    US$ 
                    <span> {price}</span>
                </div>
                <div className={styles.rating} aria-label={`Rating: ${rating.rate} stars`}>
                    <FontAwesomeIcon 
                    icon={faStar}
                    aria-label="Star rating">
                    </FontAwesomeIcon>
                    <span>{rating.rate}</span>
                </div>
                <div className={styles.numberInput} aria-label="Quantity selector">
                    <button 
                        className={styles.decrementBtn}
                        aria-label="Decrease quantity" 
                        data-set="decrement"
                        onClick={handleButtonClick}
                    >−</button>
                    <input 
                        type="number" 
                        value={amount}
                        onChange={handleInputChange} 
                        min="1" 
                        max="100" 
                        step="1"
                        className={styles.input}
                        aria-label="Quantity input"
                    />
                    <button 
                        className={styles.incrementBtn}
                        aria-label="Increase quantity" 
                        data-set="increment"
                        onClick={handleButtonClick}
                    >+</button>
                    <button
                        type="submit"
                        aria-label="Add to cart"
                        onClick={handleAddToCart}
                        className={styles.addToCartBtn}
                    >
                        Add to Cart                     
                    </button>
                    {portalTarget && createPortal(
                        <Toast
                        message={'Item(s) added!'}
                        show={isToastOpen}
                        duration={2000}
                        onClose={() => setIsToastOpen(false)}
                        ></Toast>,
                        portalTarget
                    )}
                </div>  
            </div>
        </div>
    )
}

export default memo(ProductCard)