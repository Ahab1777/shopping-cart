import { useCart } from "../../hooks/useCart";
import type { CartItem } from "../../contexts/cartContext";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CheckoutProduct.module.css";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { useState } from "react";

interface CartItemProps {
    cartItem: CartItem;
}

const CheckoutProduct = ({ cartItem }: CartItemProps) => {
    const { addToCart, removeFromCart, clearCart, cartTotal, cartItemCount} = useCart();
    const {id, title, price, image, rating, quantity} = cartItem;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    
    const handleDelete = () => {
        removeFromCart(id);
    }

    const handleClick = () => {
        setIsModalOpen(true)
    }

    


    return (
        <div className={styles.container}>
            <img src={image} alt="Product image" className={styles.img} />
            <div className={styles.title}>{title}</div>
            <div className={styles.quantity}>x <span>{quantity}</span></div>
            <div className={styles.total}>Total $<span>{(price * quantity).toFixed(2)}</span></div>
            <FontAwesomeIcon 
            icon={faTrashCan} 
            className={styles.delete}
            onClick={handleClick}
            />
            <ConfirmationModal
            product={title}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            onClose={handleDelete}
            ></ConfirmationModal>
        </div>
    )
}


export default CheckoutProduct