import { useState } from "react";
import { Review } from "../types/product";
import { useParams } from "react-router-dom";

interface AddReviewProps {
  onReviewSubmit: (review: Review) => void;
  id: string;
}

const AddReview: React.FC<AddReviewProps> = ({ onReviewSubmit }) => {
  const { id = "" } = useParams<{ id: string }>() || { id: "" };
  const [review, setReview] = useState<Review>({
    reviewerName: "",
    rating: 1,
    comment: "",
    date: new Date().toISOString(),
    id: id,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onReviewSubmit) {
      onReviewSubmit(review);
      setReview({
        reviewerName: "",
        rating: 1,
        comment: "",
        date: new Date().toISOString(),
        id: id,
      });
    } else {
      console.error("onReviewSubmit function is not passed correctly.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="reviewerName"
          className="block text-sm font-medium text-gray-700"
        >
          Your Name
        </label>
        <input
          id="reviewerName"
          type="text"
          value={review.reviewerName}
          onChange={(e) =>
            setReview((prev) => ({ ...prev, reviewerName: e.target.value }))
          }
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label
          htmlFor="rating"
          className="block text-sm font-medium text-gray-700"
        >
          Rating (1-5)
        </label>
        <div className="flex space-x-2">
          {Array.from({ length: 5 }, (_, index) => (
            <button
              key={index}
              type="button"
              className={`text-2xl ${
                review.rating > index ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() =>
                setReview((prev) => ({ ...prev, rating: index + 1 }))
              }
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700"
        >
          Your Review
        </label>
        <textarea
          id="comment"
          value={review.comment}
          onChange={(e) =>
            setReview((prev) => ({ ...prev, comment: e.target.value }))
          }
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Submit Review
      </button>
    </form>
  );
};

export default AddReview;
