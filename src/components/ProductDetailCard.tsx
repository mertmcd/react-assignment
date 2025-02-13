import React from "react";
import { Product, Review } from "../types/product";
import ImageSlider from "./ImageSlider";
import Tabs from "./ProductDetailTabs";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./ProductReviews";

interface ProductDetailCardProps {
  product: Product;
  reviews: Review[];
  onBack: () => void;
}

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({
  product,
  reviews,
  onBack,
}) => {
  const tabs = [
    {
      label: "Product Details",
      content: <ProductInfo product={product} />,
    },
    {
      label: `Reviews (${reviews.length})`,
      content: <ProductReviews reviews={reviews} />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <button
        onClick={onBack}
        className="mb-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        ← Back to Products
      </button>

      {product.images && product.images.length > 1 ? (
        <ImageSlider images={product.images} />
      ) : (
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="w-full h-96 object-contain mb-6"
        />
      )}

      <Tabs tabs={tabs} />
    </div>
  );
};

export default ProductDetailCard;
