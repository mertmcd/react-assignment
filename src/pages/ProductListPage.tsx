import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Product } from "../types/product";
import Pagination from "../components/Pagination";
import { fetchProducts } from "../api";

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const limit = 20;
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      const data = await fetchProducts(currentPage, limit);
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / limit));
    };

    fetch();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Product List
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-200 hover:scale-105 cursor-pointer"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.title}
                </h2>
                <p className="text-lg font-bold text-blue-600 mb-2">
                  ${product.price} USD
                </p>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-400 text-lg">
                    {"★".repeat(Math.round(product.rating))}
                  </span>
                  <span className="text-gray-600 ml-2">
                    ({product.reviews ? product.reviews.length : 0} reviews)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductListPage;
