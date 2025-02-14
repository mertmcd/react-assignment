import React, { useState, useEffect } from "react";
import { Product, Review } from "../types/product";
import ImageSlider from "./ImageSlider";
import Tabs from "./ProductDetailTabs";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./ProductReviews";
import Spinner from "./Spinner";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { selectReviewsByProductId } from "../features/reviewSlicer";
interface ProductDetailCardProps {
  product: Product;
  reviews: Review[];
}

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({
  product,
  reviews,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const storeReviews = useSelector((state: RootState) =>
    selectReviewsByProductId(state, product.id)
  );
  const totalReviewsCount = storeReviews.length + reviews.length;

  const tabs = [
    {
      label: "Product Details",
      content: <ProductInfo product={product} />,
    },
    {
      label: `Reviews (${totalReviewsCount})`,
      content: <ProductReviews reviews={reviews} />,
    },
  ];

  useEffect(() => {
    const preloadImages = async (): Promise<void> => {
      if (product.images && product.images.length > 0) {
        for (const src of product.images) {
          const img = new Image();
          img.src = src;
          await new Promise<void>((resolve) => {
            img.onload = () => resolve();
          });
        }
        setLoadingImage(false);
      }
    };

    preloadImages();
  }, [product.images]);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      {loadingImage ? (
        <div className="w-full h-96 flex justify-center items-center mb-6">
          <Spinner />
        </div>
      ) : product.images && product.images.length > 1 ? (
        <ImageSlider images={product.images} />
      ) : (
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-96 object-contain mb-6"
        />
      )}

      <Tabs tabs={tabs} />
    </div>
  );
};

export default ProductDetailCard;
