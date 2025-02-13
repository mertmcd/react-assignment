import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product, Review } from "../types/product";
import { fetchProduct } from "../api";
import ProductDetailCard from "../components/ProductDetailCard";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchProductDetail = async () => {
      if (!id) {
        console.error("Product ID is undefined");
        return;
      }
      try {
        const product = await fetchProduct(id);
        if (product) {
          setProduct(product);
          setReviews(product.reviews || []);
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProductDetail().catch(console.error);
  }, [id]);

  if (!product) {
    return <div className="text-center text-white text-xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 py-8">
      <div className="container mx-auto px-4">
        <ProductDetailCard
          product={product}
          reviews={reviews}
          onBack={() => navigate("/products")}
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;
