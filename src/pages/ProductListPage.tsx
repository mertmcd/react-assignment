import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Product } from "../types/product";
import Pagination from "../components/Pagination";
import ProductListCard from "../components/ProductListCard";
import { fetchProducts } from "../api";
import Spinner from "../components/Spinner";

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const limit = 20;
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      setLoading(true);
      const data = await fetchProducts(currentPage, limit);
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / limit));
      setLoading(false);
    };

    fetch();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl leading-3 font-extrabold text-gray-900 mb-8">
          Product List
        </h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductListCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!loading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
