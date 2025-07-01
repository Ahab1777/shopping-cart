import { useCart } from "../../hooks/useCart";
import type { CartItem } from "../../contexts/cartContext";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <div className="checkout-product">
            <div className="title">{title}</div>
            <div className="quantity">Qtt x<span>{quantity}</span></div>
            <div className="total">Total $<span>{price * quantity}</span></div>
            <FontAwesomeIcon 
            icon={faTrashCan} 
            className="delete"
            onClick={handleDelete}
            ></FontAwesomeIcon>
        </div>
    )
}


export default CheckoutProduct