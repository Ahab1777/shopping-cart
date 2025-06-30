import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ProductCard from '../components/ProductCard'
import { useState } from 'react'
import type { Product } from '../App'

const Shop = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const [hasSearched, setHasSearched] = useState<boolean>(false)

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;

        setLoading(true);
        try {
            const response = await fetch('https://fakestoreapi.com/products')
            if (!response.ok){
                throw new Error(`HTTP error - ${response.status}`)
            }
            const responseData: Product[] = await response.json();
            setResults(responseData)
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


    return(
        <div className="shop-container">
            <div className="search-filter-container">
                <div className="search-bar">
                    <input 
                    type="search" 
                    className="search-input" 
                    placeholder="Product / Category / Gender"/>
                    <FontAwesomeIcon 
                    icon={faMagnifyingGlass} 
                    className="search-icon"
                    onClick={handleSearch}
                    />
                </div>
                <div className="filter-bar">
                    Filter bar space
                </div>
            </div>
            <div className="products-container">
                {error && <div>Sorry, something went wrong...</div>}
                {hasSearched && loading && <div>Loading...</div>}
                {hasSearched && !loading && (
                    results.map((product) => (
                        <ProductCard product={product}></ProductCard>
                    ))
                )}
            </div>
        </div>
    )
}

export default Shop