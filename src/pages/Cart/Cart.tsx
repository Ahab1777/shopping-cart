import { useCart } from "../../hooks/useCart"
import CheckoutProduct from "../../components/CheckoutProduct/CheckoutProduct";
import styles from './Cart.module.css'
import { createPortal } from "react-dom";
import { useState } from "react";
import Toast from "../../components/Toast/Toast";

const Cart = () => {
    const {cart, cartTotal, cartItemCount} = useCart();
    const [isToastOpen, setIsToastOpen] = useState<boolean>(false)

    const cartIsEmpty = cart.length <= 0;

    const portalTarget = document.getElementById('portal-root')

    return (
        <div className={styles.container} aria-label="Shopping cart container">
            <div className={styles.itemList} aria-label="Cart items list">
                {
                 !cartIsEmpty && cart.map(cartItem => (
                    <CheckoutProduct key={cartItem.id} cartItem={cartItem}></CheckoutProduct>
                 ))  
                }
            </div>
            <div className={styles.checkoutPanel} aria-label="Checkout panel">
                <h3 className={styles.checkoutH3}>Temdetudo</h3>
                <div className={styles.divider}></div>
                <h4 className={styles.checkoutH4}>Cart content:</h4>
                <div className={styles.priceContainer} aria-label="Price summary">
                    <div 
                    className={styles.totalQuantity}
                    aria-label="Total quantity"
                        >Quantity: <span className="">{cartItemCount.toFixed(0)}
                        </span>
                    </div>
                    <div 
                    className={styles.productPriceContainer}
                    aria-label="Products total"
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
                    aria-label="Total taxes"
                    >Taxes: 
                        <span
                        className={styles.taxesSpan}>
                            <br></br>
                            US${(cartTotal*0.06).toFixed(2)}
                        </span>
                    </div>
                    <div
                    className={styles.totalContainer}
                    aria-label="Total price"
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
                    className={styles.checkoutBtn}
                    onClick={() => setIsToastOpen(true)}
                    aria-label="Proceed to checkout"
                >Proceed to checkout</button>
                {portalTarget && createPortal(
                    <Toast
                    message={'Just for display, sorry!'}
                    isToastOpen={isToastOpen}
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