import { useCart } from "../../hooks/useCart"
import CheckoutProduct from "../../components/CheckoutProduct/CheckoutProduct";
import styles from './Cart.module.css'

const Cart = () => {
    const {cart, removeFromCart, clearCart, cartTotal, cartItemCount} = useCart();

    const cartIsEmpty = cart.length <= 0;


    return (
        <div className={styles.container}>
            <div className={styles.itemList}>
                {
                 !cartIsEmpty && cart.map(cartItem => (
                    <CheckoutProduct key={cartItem.id} cartItem={cartItem}></CheckoutProduct>
                 ))  
                }
            </div>
            <div className={styles.checkoutPanel}>
                <div 
                className={styles.totalPrice}
                >Total: <span className="">{cartTotal.toFixed(2)}</span>
                </div>
                <div 
                className={styles.totalQuantity}
                >Quantity: <span className="">{cartItemCount.toFixed(0)}</span></div>
            </div>
        </div>
    )
}

export default Cart