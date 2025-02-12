import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Product, Review } from "../types/product";
import ImageSlider from "../components/ImageSlider";
import Tabs from "../components/ProductDetailTabs";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(response.data);
      setReviews(response.data.reviews);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center text-white text-xl">Loading...</div>;
  }

  const tabs = [
    {
      label: "Product Details",
      content: (
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-sm text-gray-500 mt-2">
            <strong>Category:</strong> {product.category} |{" "}
            <strong>Brand:</strong> {product.brand} | <strong>SKU:</strong>{" "}
            {product.sku} | <strong>Barcode:</strong> {product.meta.barcode}
          </p>
          <div className="mt-3">
            <span className="text-sm font-semibold text-gray-700">Tags:</span>{" "}
            {product.tags.map((tag, index) => (
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
            ${product.price.toFixed(2)} USD
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
            <strong>Dimensions:</strong> {product.dimensions.width}cm (W) x{" "}
            {product.dimensions.height}cm (H) x {product.dimensions.depth}cm (D)
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
      ),
    },
    {
      label: `Reviews (${reviews ? reviews.length : 0})`,
      content:
        reviews && reviews.length > 0 ? (
          <ul className="space-y-4">
            {reviews.map((review, index) => (
              <li key={index} className="border p-4 rounded-lg shadow">
                <p className="font-semibold text-gray-700">
                  {review.reviewerName}{" "}
                  <span className="text-yellow-500">
                    {"★".repeat(review.rating)}
                  </span>
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
        ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <button
            onClick={() => navigate("/products")}
            className="mb-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            ← Back to Products
          </button>

          {product.images && product.images.length > 0 ? (
            <ImageSlider images={product.images} />
          ) : (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-96 object-contain mb-6"
            />
          )}

          <Tabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
