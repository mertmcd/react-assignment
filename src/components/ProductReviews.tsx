import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Review } from "../types/product";
import AddReview from "./AddReview";

interface ProductReviewsProps {
  reviews: Review[];
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews }) => {
  const { id } = useParams<{ id: string }>();
  const [allReviews, setAllReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (!id) return;

    const storedReviews = localStorage.getItem("reviews");
    const parsedReviews: Review[] = storedReviews
      ? JSON.parse(storedReviews)
      : [];

    const matchedReviews = parsedReviews.filter((review) => review.id === id);

    const updatedReviews = [...reviews, ...matchedReviews];

    setAllReviews(updatedReviews);
  }, [reviews, id]);

  const handleReviewSubmit = (newReview: Review) => {
    if (!id) return;

    const storedReviews = localStorage.getItem("reviews") ?? "[]";
    const parsedReviews: Review[] = storedReviews
      ? JSON.parse(storedReviews)
      : [];

    const updatedReviews = [...parsedReviews, newReview];
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));

    setAllReviews([...allReviews, newReview]);
  };

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
      <AddReview onReviewSubmit={handleReviewSubmit} id={id ?? ""} />
    </div>
  );
};

export default ProductReviews;
