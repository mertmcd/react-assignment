import React from "react";
import { Review } from "../types/product";

interface ProductReviewsProps {
  reviews: Review[];
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews }) => {
  return reviews.length > 0 ? (
    <ul className="space-y-4">
      {reviews.map((review, index) => (
        <li key={index} className="border p-4 rounded-lg shadow">
          <p className="font-semibold text-gray-700">
            {review.reviewerName}{" "}
            <span className="text-yellow-500">{"★".repeat(review.rating)}</span>
          </p>
          <p className="text-gray-600 mt-2">
            {new Date(review.date).toLocaleDateString("tr-TR")}
          </p>
          <p className="text-gray-600 mt-2">{review.comment}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500">No reviews available.</p>
  );
};

export default ProductReviews;
