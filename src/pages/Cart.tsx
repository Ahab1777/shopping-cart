import { useCart } from "../hooks/useCart"

const Cart = () => {
    const {removeFromCart, clearCart, cartTotal, cartItemCount} = useCart();

    return (
        <div className="cart-container">
            <div className="item-list"></div>
            <div className="checkout-panel">
                <div 
                className="total-price"
                >Total: <span className="">{cartTotal}</span>
                </div>
                <div 
                className="total-quantity"
                >Quantity: <span className="">{cartItemCount}</span></div>
            </div>
        </div>
    )
}

export default Cart