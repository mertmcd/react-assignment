import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../types/product";

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{product.price} USD</p>
          <p>{"★".repeat(product.rating)}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductListPage;
