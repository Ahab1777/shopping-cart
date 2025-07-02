import { useCart } from "../../hooks/useCart";
import type { CartItem } from "../../contexts/cartContext";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CheckoutProduct.module.css";

interface CartItemProps {
    cartItem: CartItem;
}

const CheckoutProduct = ({ cartItem }: CartItemProps) => {
    const { addToCart, removeFromCart, clearCart, cartTotal, cartItemCount} = useCart();
    const {id, title, price, image, rating, quantity} = cartItem;
    
    const handleDelete = () => {
        removeFromCart(id);
    }

    


    return (
        <div className={styles.container}>
            <div className={styles.title}>{title}</div>
            <div className={styles.quantity}>Qtt x<span>{quantity}</span></div>
            <div className={styles.total}>Total $<span>{price * quantity}</span></div>
            <FontAwesomeIcon 
            icon={faTrashCan} 
            className={styles.delete}
            onClick={handleDelete}
            />
        </div>
    )
}


export default CheckoutProduct