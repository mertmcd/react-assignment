import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";
import "@testing-library/jest-dom";

describe("Pagination", () => {
  it("should render the pagination component with correct page numbers", () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
    );
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should call onPageChange with the correct page number when a page is clicked", () => {
    const onPageChangeMock = jest.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    const page2 = screen.getByText("2");
    fireEvent.click(page2);
    expect(onPageChangeMock).toHaveBeenCalledWith(2);

    const page5 = screen.getByText("5");
    fireEvent.click(page5);
    expect(onPageChangeMock).toHaveBeenCalledWith(5);
  });

  it("should disable the previous button on the first page", () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
    );
    const previousButton = screen.getByText("Prev");
    expect(previousButton).toBeDisabled();
  });

  it("should disable the next button on the last page", () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />
    );
    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });
});
