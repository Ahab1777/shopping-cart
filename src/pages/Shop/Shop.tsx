import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ProductCard from '../../components/ProductCard/ProductCard'
import { useState, type ChangeEvent, type KeyboardEvent } from 'react'
import type { Product } from '../../App'
import styles from './Shop.module.css'

const Shop = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const [hasSearched, setHasSearched] = useState<boolean>(false)


    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setSearchTerm(e.target.value)        
    }

    const handleSearch = async () => {
        console.log('clicked')
        if (!searchTerm.trim()) {
            setError('Please, enter valid search term')
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await fetch('https://fakestoreapi.com/products')
            if (!response.ok){
                throw new Error(`HTTP error - ${response.status}`)
            }
            const allProducts: Product[] = await response.json();
            const filteredProducts = allProducts.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())
            );

            setResults(filteredProducts)
            setHasSearched(true)
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

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            handleSearch()
        }
    }


    return(
        <div className={styles.shopContainer}>
            <div className={styles.searchFilterContainer}>
                <div className={styles.searchBar}>
                    <input 
                    type="search" 
                    onChange={onChange}
                    value={searchTerm}
                    className={styles.searchInput} 
                    onKeyDown={handleKeyPress}
                    placeholder="Product / Category / Gender"/>
                    <FontAwesomeIcon 
                    icon={faMagnifyingGlass} 
                    className={styles.searchIcon}
                    onClick={handleSearch}
                    />
                </div>
                <div className={styles.filterBar}>
                    Filter bar space
                </div>
            </div>
            <div className={styles.productsContainer}>
                {error && <div>Sorry, something went wrong...</div>}
                {hasSearched && loading && <div>Loading...</div>}
                {hasSearched && !loading && (
                    results.map((product) => (
                        <ProductCard key={product.id} product={product}></ProductCard>
                    ))
                )}
            </div>
        </div>
    )
}

export default Shop