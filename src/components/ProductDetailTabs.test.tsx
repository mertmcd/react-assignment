import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductDetailTabs from "./ProductDetailTabs";
import "@testing-library/jest-dom";
import { Tab } from "../types/tabs";

describe("ProductDetailTabs", () => {
  it("should render tabs with correct labels", () => {
    const tabs: Tab[] = [
      { label: "Description", content: "Product Description" },
      { label: "Specifications", content: "Product Specifications" },
    ];

    render(<ProductDetailTabs tabs={tabs} />);
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Specifications")).toBeInTheDocument();
  });

  it("should render the first tab as active by default", () => {
    const tabs = [
      { label: "Tab 1", content: "Content 1" },
      { label: "Tab 2", content: "Content 2" },
    ];

    render(<ProductDetailTabs tabs={tabs} />);
    const firstTab = screen.getByText("Tab 1");
    expect(firstTab).toHaveClass(
      "border-b-2",
      "border-blue-500",
      "text-blue-500"
    );
  });

  it("should change active tab when a tab is clicked", () => {
    const tabs = [
      { label: "Tab 1", content: "Content 1" },
      { label: "Tab 2", content: "Content 2" },
      { label: "Tab 3", content: "Content 3" },
    ];

    render(<ProductDetailTabs tabs={tabs} />);
    const secondTab = screen.getByText("Tab 2");
    fireEvent.click(secondTab);

    expect(secondTab).toHaveClass(
      "border-b-2",
      "border-blue-500",
      "text-blue-500"
    );
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });
});
