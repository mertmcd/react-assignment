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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      if (!id) {
        console.error("Product ID is undefined");
        return;
      }
      try {
        setLoading(true);
        const product = await fetchProduct(id);
        if (product) {
          setProduct(product);
          setReviews(product.reviews || []);
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail().catch(console.error);
  }, [id]);

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-6 py-2 text-gray-900 font-semibold rounded-lg"
        >
          ← Back to Products
        </button>
        <h1 className="lg:text-2xl text-xl leading-3 font-extrabold text-gray-900 mb-12">
          {loading ? "Loading..." : ""}
        </h1>
        {!loading && product && (
          <ProductDetailCard product={product} reviews={reviews} />
        )}
        {!loading && !product && (
          <div className="text-center text-gray-900">Product not found</div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
