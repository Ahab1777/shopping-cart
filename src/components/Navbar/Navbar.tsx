import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import styles from './Navbar.module.css'

const Navbar = () => {
    const { cartItemCount } = useCart();

    return (
        <div className={styles.navbar}>
            <Link to="/" className={styles.homeButton} aria-label="Home">Home</Link>
            <Link to="shop" className={styles.shopButton} aria-label="Shop">Shop</Link>
            <Link
                id='navbarCartContainer'
                className={styles.cartButton}
                to="cart"
                aria-label={`Cart${cartItemCount > 0 ? ` with ${cartItemCount} items` : ''}`}
            >
                Cart {cartItemCount > 0 && <span className={styles.cartBadge}>({cartItemCount})</span>}
            </Link>
        </div>
    );
};

export default Navbar;