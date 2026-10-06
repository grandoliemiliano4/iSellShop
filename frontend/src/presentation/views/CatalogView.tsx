"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "../ui/components/ProductCard";
import Pagination from "../ui/layouts/Pagination";
import { useProducts } from "@/hooks/useProducts";

export default function CatalogView() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);

  const textFilter = searchParams.get("search") || "";
  const categoryFilter = searchParams.get("category") || "";
  const conditionFilter = searchParams.get("condition") || "";

  useEffect(() => {
    setPage(1);
  }, [textFilter, categoryFilter, conditionFilter]);

  // Limitamos a 12 (3 columnas x 4 filas)
  const limit = 12;
  const { products, isLoading, error, lastPage } = useProducts(
    page,
    limit,
    textFilter,
    categoryFilter,
    conditionFilter,
  );

  const groupedProducts = React.useMemo(() => {
    const map = new Map<string, typeof products[0]>();
    const result: typeof products = [];
    
    products.forEach((product) => {
      if (product.condition === 'NUEVO') {
        if (!map.has(product.name)) {
          map.set(product.name, product);
          result.push(product);
        }
      } else {
        result.push(product);
      }
    });
    
    return result;
  }, [products]);

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-2xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4 tracking-tight">
            Nuestros Productos
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explora nuestro catálogo de artículos de alta tecnología. Encuentra
            exactamente lo que necesitas para tu setup.
          </p>
        </div>

        {/* El componente ProductSearch ha sido removido y movido al Header como modal */}

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : (
          <>
            {/* Cambiado de lg:grid-cols-4 a lg:grid-cols-3 para tener 3 columnas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {groupedProducts.length > 0 ? (
                groupedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No se encontraron productos con esos filtros.
                  </p>
                </div>
              )}
            </div>

            <Pagination
              currentPage={page}
              lastPage={lastPage}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
