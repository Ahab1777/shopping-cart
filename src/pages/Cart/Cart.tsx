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
                <button>Proceed to checkout</button>
            </div>
        </div>
    )
}

export default Cart