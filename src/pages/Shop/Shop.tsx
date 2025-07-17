import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ProductCard from '../../components/ProductCard/ProductCard'
import { useState, type ChangeEvent, type KeyboardEvent } from 'react'
import type { Product } from '../../App'
import styles from './Shop.module.css'
import FilterBar from '../../components/FilterBar/FilterBar'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'

const Shop = () => {
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const [hasSearched, setHasSearched] = useState<boolean>(false)
    const [filter, setFilter] = useState<string>('phl')
    
    // Router navigation
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const initialSearch = params.get('search') || ''; 
    const [searchTerm, setSearchTerm] = useState<string>(initialSearch);

    const filterProducts = (productList: Product[]) => {
        const sortedResults = [...productList];
        switch (filter) {
            case "phl":
                sortedResults.sort((a, b) => b.price - a.price);
                break;
            case "plh":
                sortedResults.sort((a, b) => a.price - b.price);
                break;
            case "rhl":
                sortedResults.sort((a, b) => b.rating.rate - a.rating.rate);
                break;
            case "rlh":
                sortedResults.sort((a, b) => a.rating.rate - b.rating.rate);
                break;
            default:
                break;
        }
        setResults(sortedResults);
    };

    useEffect(() => {
        if (initialSearch) {
            handleSearch(); // Optionally trigger search on mount if param exists
        }
        // eslint-disable-next-line
    }, [initialSearch]);    

    useEffect(() => {
        if (hasSearched) {
            filterProducts(results);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);


    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setSearchTerm(e.target.value)        
    }

    const handleSearch = async () => {
        console.log('Search clicked')
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
            // add filter here
            filterProducts(filteredProducts)
            //setResults is not necessary here since filterProducts already calls it 
            // setResults(filteredProducts)
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


    return (
        <div className={styles.shopContainer}>
            <div className={styles.searchFilterContainer}>
                <div className={styles.searchBar}>
                    <input 
                    type="search" 
                    onChange={onChange}
                    value={searchTerm}
                    className={styles.searchInput} 
                    onKeyDown={handleKeyPress}
                    placeholder="Search here..."
                    aria-label="Type search here"
                    />
                    <FontAwesomeIcon 
                    icon={faMagnifyingGlass} 
                    className={styles.searchIcon}
                    onClick={handleSearch}
                    aria-label="Search"
                    tabIndex={0}
                    />
                </div>
                <FilterBar setFilter={setFilter}></FilterBar>
            </div>
            <div className={styles.productsContainer}>
                {error && <div>Sorry, something went wrong...</div>}
                {hasSearched && loading && <div>Loading...</div>}
                {hasSearched && !loading && (results.length === 0) && <div className={styles.noMatch}>Sorry, no matching results.</div> }
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