import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddReview from "./AddReview";
import { useDispatch } from "react-redux";
import "@testing-library/jest-dom";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("AddReview", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the form", () => {
    render(<AddReview id={1} />);
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("should have a submit button", () => {
    render(<AddReview id={1} />);
    expect(
      screen.getByRole("button", { name: /Submit Review/i })
    ).toBeInTheDocument();
  });

  it("should have a text input for reviewer name", () => {
    render(<AddReview id={1} />);
    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
  });

  it("should have a textarea for comment", () => {
    render(<AddReview id={1} />);
    expect(screen.getByLabelText(/Your Review/i)).toBeInTheDocument();
  });

  it("should have a rating input with default value of 1", () => {
    render(<AddReview id={1} />);
    const ratingStars = screen.getAllByRole("button", { name: /★/i });
    expect(ratingStars[0]).toHaveClass("text-yellow-500");
  });

  it("should dispatch an action when the form is submitted", () => {
    render(<AddReview id={1} />);

    const reviewerNameInput = screen.getByLabelText(/Your Name/i);
    const commentInput = screen.getByLabelText(/Your Review/i);
    const submitButton = screen.getByRole("button", { name: /Submit Review/i });

    fireEvent.change(reviewerNameInput, { target: { value: "John Doe" } });
    fireEvent.change(commentInput, { target: { value: "Great product!" } });
    fireEvent.click(submitButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "review/addReview",
      payload: {
        reviewerName: "John Doe",
        rating: 1,
        comment: "Great product!",
        date: expect.any(String),
        id: 1,
      },
    });
  });
});
