import type { Dispatch, SetStateAction } from "react";
import styles from './FilterBar.module.css'
import { memo } from "react";

interface FilterBarProps {
    setFilter: Dispatch<SetStateAction<string>>;
}

const FilterBar = ({setFilter}: FilterBarProps) => {

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
       setFilter(value)
    };


    return (
        <div className={styles.filterBar}>
            <label 
                className={styles.label}
                htmlFor="filter-select"
            >
                Sort by:
            </label>
            <select
                className={styles.select}
                id="filter-select"
                aria-label="Sort products"
                onChange={handleFilterChange}
            >
                <option value="phl">Price - High to Low</option>
                <option value="plh">Price - Low to High</option>
                <option value="rhl">Rating - High to Low</option>
                <option value="rlh">Rating - Low to High</option>
            </select>
        </div>
    )
}

export default memo(FilterBar)