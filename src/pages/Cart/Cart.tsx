import { useCart } from "../../hooks/useCart"
import CheckoutProduct from "../../components/CheckoutProduct/CheckoutProduct";

const Cart = () => {
    const {cart, removeFromCart, clearCart, cartTotal, cartItemCount} = useCart();

    const cartIsEmpty = cart.length <= 0;


    return (
        <div className="cart-container">
            <div className="item-list">
                {
                 !cartIsEmpty && cart.map(cartItem => (
                    <CheckoutProduct key={cartItem.id} cartItem={cartItem}></CheckoutProduct>
                 ))  
                }
            </div>
            <div className="checkout-panel">
                <div 
                className="total-price"
                >Total: <span className="">{cartTotal.toFixed(2)}</span>
                </div>
                <div 
                className="total-quantity"
                >Quantity: <span className="">{cartItemCount.toFixed(0)}</span></div>
            </div>
        </div>
    )
}

export default Cart