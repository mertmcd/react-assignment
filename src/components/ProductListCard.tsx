import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product, Review } from "../types/product";
import SkeletonLoader from "./SkeletonLoader";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { selectReviewsByProductId } from "../features/reviewSlicer";
interface ProductListCardProps {
  product: Product;
}

const ProductListCard: React.FC<ProductListCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const matchedReviews = useSelector((state: RootState) =>
    selectReviewsByProductId(state, product.id)
  );

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return (price - price * (discount / 100)).toFixed(2);
  };

  const totalReviewsCount = matchedReviews.length + product.reviews.length;
  const ProductReviews = (product.reviews as Review[]) ?? [];

  const totalRating =
    matchedReviews.reduce((acc, review) => acc + review.rating, 0) +
    ProductReviews.reduce((acc, review) => acc + review.rating, 0);

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-transparent rounded-lg border border-gray-200 shadow-lg overflow-hidden transform transition-transform duration-200 hover:scale-105 cursor-pointer hover:shadow-2xl hover:border-gray-300"
    >
      {isLoading && <SkeletonLoader />}

      <img
        src={product.thumbnail}
        alt={product.title}
        loading="lazy"
        className={`w-full h-48 object-contain transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
      />

      <div className="p-4">
        <div>
          {product.brand && product.brand.length > 0 && (
            <span className="text-xs bg-gray-100 rounded border border-solid border-b-gray-200 p-1 text-center text-gray-600 mr-2">
              {product.brand}
            </span>
          )}
          <p className="text-lg font-semibold text-gray-900">{product.title}</p>
        </div>
        <p className="text-sm font-bold text-gray-600 mb-2 line-through">
          ${product.price} USD
        </p>
        {product?.discountPercentage > 0 && (
          <p className="text-lg text-blue-600 font-semibold">
            $
            {calculateDiscountedPrice(
              product.price,
              product.discountPercentage
            )}{" "}
            USD
          </p>
        )}
        <div className="flex items-center mb-2">
          <span className="text-yellow-400 text-lg">
            {"★".repeat(Math.round(totalRating / totalReviewsCount))}
          </span>
          <span className="text-gray-600 ml-2">
            ({totalReviewsCount} reviews)
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductListCard;
