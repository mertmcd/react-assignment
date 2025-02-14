import { useState } from "react";
import { Review } from "../types/product";
import { useDispatch } from "react-redux";
import { addReview } from "../features/reviewSlicer";
import Notification from "./Notification";
import { NotificationProps } from "../types/notificationMessage";
interface AddReviewProps {
  id: number;
}

const AddReview: React.FC<AddReviewProps> = ({ id }) => {
  const [review, setReview] = useState<Review>({
    reviewerName: "",
    rating: 1,
    comment: "",
    date: new Date().toISOString(),
    id: id,
  });

  const [notification, setNotification] = useState<NotificationProps | null>(
    null
  );

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    dispatch(addReview(review));

    setReview({
      reviewerName: "",
      rating: 1,
      comment: "",
      date: new Date().toISOString(),
      id: id,
    });

    setNotification({
      message: "Review added successfully",
      type: "success",
      duration: 3000,
      onClose: () => {
        setNotification(null);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-solid border-b-gray-300 rounded-md p-4 shadow-md bg-blue-50"
    >
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          duration={notification.duration ?? 3000}
          onClose={() => setNotification(null)}
        />
      )}
      <h2 className="text-2xl font-semibold text-blue-900 mb-2">
        Add A Review
      </h2>

      <div className="m-2">
        <label
          htmlFor="reviewerName"
          className="block text-sm font-medium text-blue-700"
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
          className="block w-full px-4 py-2 border border-blue-300 rounded-md bg-blue-100"
          required
        />
      </div>

      <div className="m-2">
        <label
          htmlFor="rating"
          className="block text-sm font-medium text-blue-700"
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

      <div className="m-2">
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-blue-700"
        >
          Your Review
        </label>
        <textarea
          id="comment"
          value={review.comment}
          onChange={(e) =>
            setReview((prev) => ({ ...prev, comment: e.target.value }))
          }
          className="mt-1 block w-full px-4 py-2 border border-blue-300 rounded-md bg-blue-100"
          required
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 font-semibold rounded-md hover:bg-blue-600"
      >
        Submit Review
      </button>
    </form>
  );
};

export default AddReview;
