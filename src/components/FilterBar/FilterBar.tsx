import type { Dispatch, SetStateAction } from "react";
import type { Product } from "../../App"


interface FilterBarProps {
    results: Product[];
    setResults: Dispatch<SetStateAction<Product[]>>;
}

const FilterBar = ({results, setResults}: FilterBarProps) => {

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const sortedResults = [...results];
        switch (value) {
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


    return (
        <div className="FilterBar">
            <label htmlFor="filter-select">Sort by:</label>
            <select 
            id="filter-select"
            onChange={handleFilterChange}>
                <option value="phl">Price - High to Low</option>
                <option value="plh">Price - Low to High</option>
                <option value="rhl">Rating - High to Low</option>
                <option value="rlh">Rating - Low to High</option>
            </select>
        </div>
    )
}

export default FilterBar