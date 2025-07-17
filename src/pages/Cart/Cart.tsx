import { useCart } from "../../hooks/useCart"
import CheckoutProduct from "../../components/CheckoutProduct/CheckoutProduct";
import styles from './Cart.module.css'
import { createPortal } from "react-dom";
import { useState } from "react";
import Toast from "../../components/Toast/Toast";

const Cart = () => {
    const {cart, removeFromCart, clearCart, cartTotal, cartItemCount} = useCart();
    const [isToastOpen, setIsToastOpen] = useState<boolean>(false)

    const cartIsEmpty = cart.length <= 0;

    const portalTarget = document.getElementById('portal-root')

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
                <h3 className={styles.checkoutH3}>Temdetudo</h3>
                <div className={styles.divider}></div>
                <h4 className={styles.checkoutH4}>Cart content:</h4>
                <div className={styles.priceContainer}>
                    <div 
                    className={styles.totalQuantity}
                        >Quantity: <span className="">{cartItemCount.toFixed(0)}
                        </span>
                    </div>
                    <div 
                    className={styles.productPriceContainer}
                    >Products:
                        <span 
                        className={styles.productPriceSpan}
                        >
                            <br></br>
                            US${cartTotal.toFixed(2)}
                        </span>
                    </div>  
                    <div
                    className={styles.taxesContainer}
                    >Taxes: 
                        <span
                        className={styles.taxesSpan}>
                            <br></br>
                            US${(cartTotal*0.06).toFixed(2)}
                        </span>
                    </div>
                    <div
                    className={styles.totalContainer}
                    >Total:
                    <span 
                        className={styles.totalSpan}
                        >
                            <br></br>
                            US${(cartTotal*0.06 + cartTotal).toFixed(2)}
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => setIsToastOpen(true)}
                >Proceed to checkout</button>
                {portalTarget && createPortal(
                    <Toast
                    message={'Just for display, sorry!'}
                    show={isToastOpen}
                    duration={3000}
                    onClose={() => setIsToastOpen(false)}
                    ></Toast>,
                    portalTarget
                )}                
            </div>
        </div>
    )
}

export default Cart