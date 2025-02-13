import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/product";
import SkeletonLoader from "./SkeletonLoader";

interface ProductListCardProps {
  product: Product;
}

const ProductListCard: React.FC<ProductListCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-200 hover:scale-105 cursor-pointer"
    >
      {isLoading && <SkeletonLoader />}

      <img
        src={product.thumbnail}
        alt={product.title}
        loading="lazy"
        className={`w-full h-48 object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {product.title}
        </h2>
        <p className="text-lg font-bold text-blue-600 mb-2">
          ${product.price} USD
        </p>
        <div className="flex items-center mb-2">
          <span className="text-yellow-400 text-lg">
            {"★".repeat(Math.round(product.rating))}
          </span>
          <span className="text-gray-600 ml-2">
            ({product.reviews ? product.reviews.length : 0} reviews)
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductListCard;
