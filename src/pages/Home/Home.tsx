import { useEffect, useState } from 'react';
import styles from './Home.module.css'
import type { Product } from '../App';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        //Select 3 items randomly to be featured
        const randomNumbers: number[] = [];
        while (randomNumbers.length < 3) {
            const num = Math.floor(Math.random() * 20) + 1;
            if (!randomNumbers.includes(num)) {
                randomNumbers.push(num);
            }
        }

        const fetchFeaturedProducts = async() => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok){
                    throw new Error(`HTTP error: ${response.status}`)
                }
                const responseData: Product[] = await response.json();
                const filteredProducts = 
                    randomNumbers.map(number => {
                        return responseData.find(product => product.id === number)})
                    .filter((product): product is Product => product !== undefined);
                
                setFeaturedProducts(filteredProducts)
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false)
            }
        }
        fetchFeaturedProducts()
    }, []);



    return (
        <>
            <h2 
                className={styles.logo}
            >Temdetudo - Fake Shop</h2>
            <div className={styles.searchContainer}>
                <input 
                    type="search" 
                    className={styles.searchInput} 
                    placeholder="What do you need today?"/>
                <button 
                    className={styles.searchButton}
                    type="submit"
                >Search</button>
            </div>
            <div className={styles.featuredContainer}>
                {loading && (<div>Loading...</div>)}
                {error && (<div>{error}</div>)}
                {!loading && featuredProducts.map(({id, title, image}) => (
                    <div className={styles.featuredCard} key={id}>
                        <h3>{title}</h3>
                        <img className={styles.featuredImg} src={image}></img>
                    </div>
                ))}
            </div>

        </>
    )
}

export default Home;