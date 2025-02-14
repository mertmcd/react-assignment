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

  it("should render discount information if discount is available", () => {
    const productWithDiscount = {
      discountPercentage: 15,
      price: 100,
    } as Product;

    render(<ProductInfo product={productWithDiscount} />);
    expect(screen.getByText("15% Discount Available!")).toBeInTheDocument();
  });

  it("should render stock status with correct color based on stock level", () => {
    const productWithLowStock = {
      stock: 5,
      availabilityStatus: "Low Stock",
    } as Product;

    render(<ProductInfo product={productWithLowStock} />);
    const stockStatus = screen.getByText("Low Stock (5 left in stock)");
    expect(stockStatus).toHaveClass("text-red-500");

    const productWithHighStock = {
      stock: 20,
      availabilityStatus: "In Stock",
    } as Product;

    render(<ProductInfo product={productWithHighStock} />);
    const highStockStatus = screen.getByText("In Stock (20 left in stock)");
    expect(highStockStatus).toHaveClass("text-green-600");
  });

  it("should render product tags correctly", () => {
    const productWithTags = {
      tags: ["eco-friendly", "new-arrival", "sale"],
    } as Product;

    render(<ProductInfo product={productWithTags} />);
    expect(screen.getByText("eco-friendly")).toBeInTheDocument();
    expect(screen.getByText("new-arrival")).toBeInTheDocument();
    expect(screen.getByText("sale")).toBeInTheDocument();
  });

  it("should render the price formatted to two decimal places", () => {
    const productWithPrice = {
      price: 99.99,
    } as Product;

    render(<ProductInfo product={productWithPrice} />);
    expect(screen.getByText("$99.99 USD")).toBeInTheDocument();
  });
});
