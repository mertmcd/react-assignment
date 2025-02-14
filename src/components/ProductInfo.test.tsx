import React from "react";
import { render, screen } from "@testing-library/react";
import ProductInfo from "./ProductInfo";
import "@testing-library/jest-dom";
import { Product } from "../types/product";

describe("ProductInfo", () => {
  it("should render the product information", () => {
    render(<ProductInfo product={{} as Product} />);
    expect(screen.getByText("Category:")).toBeInTheDocument();
    expect(screen.getByText("Brand:")).toBeInTheDocument();
    expect(screen.getByText("SKU:")).toBeInTheDocument();
    expect(screen.getByText("Barcode:")).toBeInTheDocument();
    expect(screen.getByText("Dimensions:")).toBeInTheDocument();
    expect(screen.getByText("Weight:")).toBeInTheDocument();
    expect(screen.getByText("Warranty:")).toBeInTheDocument();
    expect(screen.getByText("Shipping:")).toBeInTheDocument();
    expect(screen.getByText("Return Policy:")).toBeInTheDocument();
  });
});
