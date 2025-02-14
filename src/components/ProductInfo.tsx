import React from "react";
import { Product } from "../types/product";
interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
      <p className="text-sm text-gray-500 mt-2">
        <strong>Category:</strong> {product.category} | <strong>Brand:</strong>{" "}
        {product.brand} | <strong>SKU:</strong> {product.sku} |{" "}
        <strong>Barcode:</strong> {product.meta?.barcode}
      </p>
      <div className="mt-3">
        <span className="text-sm font-semibold text-gray-700">Tags:</span>{" "}
        {product.tags?.map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-md mr-1"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-lg text-gray-600 my-4">{product.description}</p>

      <p className="text-2xl font-bold text-blue-600">
        ${product.price?.toFixed(2)} USD
      </p>

      {(product.discountPercentage ?? 0) > 0 && (
        <p className="text-lg text-red-500 font-semibold mt-1">
          {product.discountPercentage}% Discount Available!
        </p>
      )}

      <p
        className={`text-md font-semibold mt-2 ${
          product.stock > 10 ? "text-green-600" : "text-red-500"
        }`}
      >
        {product.availabilityStatus} ({product.stock} left in stock)
      </p>
      <br />

      <p className="text-sm text-gray-600">
        <strong>Dimensions:</strong> {product.dimensions?.width}cm (W) x{" "}
        {product.dimensions?.height}cm (H) x {product.dimensions?.depth}cm (D)
      </p>
      <p className="text-sm text-gray-600">
        <strong>Weight:</strong> {product.weight}g
      </p>

      <p className="text-sm text-gray-600">
        <strong>Warranty:</strong> {product.warrantyInformation}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Shipping:</strong> {product.shippingInformation}
      </p>

      <p className="text-sm text-gray-600">
        <strong>Return Policy:</strong> {product.returnPolicy}
      </p>
    </div>
  );
};

export default ProductInfo;
