import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import styles from './Navbar.module.css'

const Navbar = () => {
    const { cartItemCount } = useCart();

    return (
        <div className={styles.navbar}>
            <Link to="/" className={styles.homeButton}>Home</Link>
            <Link to="shop" className={styles.shopButton}>Shop</Link>
            <Link to="cart" className={styles.cartButton}>
            Cart {cartItemCount > 0 && <span className={styles.cartBadge}>({cartItemCount})</span>}
            </Link>
        </div>
    );
};

export default Navbar;