import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Review } from "../types/product";
import AddReview from "./AddReview";
import { RootState } from "../store";
import { useSelector } from "react-redux";
interface ProductReviewsProps {
  reviews: Review[];
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews }) => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || "0");
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const storeReviews = useSelector((state: RootState) => state.review.reviews);

  useEffect(() => {
    if (!id) return;
    const matchedReviews = storeReviews.filter(
      (review) => review.id === productId
    );
    const updatedReviews = [...reviews, ...matchedReviews];
    setAllReviews(updatedReviews);
  }, [id, reviews, storeReviews]);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-900">Product Reviews</h2>
      {allReviews.map((review, index) => (
        <div key={index} className="border p-4 rounded-lg shadow">
          <p className="font-semibold text-gray-700">
            {review.reviewerName}{" "}
            <span className="text-yellow-500">{"★".repeat(review.rating)}</span>
          </p>
          <p className="text-gray-600 mt-2">
            {new Date(review.date).toLocaleDateString("tr-TR")}
          </p>
          <p className="text-gray-600 mt-2">{review.comment}</p>
        </div>
      ))}
      <AddReview id={productId} />
    </div>
  );
};

export default ProductReviews;
