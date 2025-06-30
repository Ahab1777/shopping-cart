import type { Product } from "../App";

interface ProductProps {
    product: Product;
}

const ProductCard = ({ product }: ProductProps) => {
    const { id, title, price, image, rating } = product;

    return (
        <div className="product-card" data-id={id}>
            <h3>{title}</h3>
            <img src={image} alt="Product image" className="" />
            <div className="">{price}</div>
            <div className="">{rating.rate}</div>
        </div>
    )
}

export default ProductCard