import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product, Review } from "../types/product";
import { fetchProduct } from "../api";
import ProductDetailCard from "../components/ProductDetailCard";
import Spinner from "../components/Spinner";

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
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          {loading ? "Loading..." : product?.title}
        </h1>

        {loading && (
          <div className="flex justify-center items-center min-h-[60vh]">
            <Spinner />
          </div>
        )}
        {!loading && product && (
          <ProductDetailCard
            product={product}
            reviews={reviews}
            onBack={() => navigate("/products")}
          />
        )}
        {!loading && !product && (
          <div className="text-center text-white">Product not found</div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
