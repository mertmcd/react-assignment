import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Product } from "../types/product";
import Pagination from "../components/Pagination";
import ProductListCard from "../components/ProductListCard";
import { fetchProducts } from "../api";

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
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
            <ProductListCard key={product.id} product={product} />
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
