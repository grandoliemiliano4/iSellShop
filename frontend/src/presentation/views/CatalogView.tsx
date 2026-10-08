"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "../ui/components/ProductCard";
import Pagination from "../ui/layouts/Pagination";
import { useProducts } from "@/hooks/useProducts";
import { Search, Filter, SlidersHorizontal, ChevronDown } from "lucide-react";

export default function CatalogView() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);

  // Filter States
  const [localSearch, setLocalSearch] = useState(searchParams.get("search") || "");
  const [localCategory, setLocalCategory] = useState(searchParams.get("category") || "");
  const [localCondition, setLocalCondition] = useState(searchParams.get("condition") || "");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sortBy, setSortBy] = useState("recent");
  
  const [debouncedSearch, setDebouncedSearch] = useState(localSearch);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(localSearch), 500);
    return () => clearTimeout(handler);
  }, [localSearch]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, localCategory, localCondition, minPrice, maxPrice, sortBy]);

  const limit = 12;
  const { products, isLoading, error, lastPage } = useProducts(
    page,
    limit,
    debouncedSearch,
    localCategory,
    localCondition,
    minPrice ? Number(minPrice) : undefined,
    maxPrice ? Number(maxPrice) : undefined,
    sortBy === 'recent' ? undefined : sortBy
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
    <div className="min-h-screen bg-[#FBFBFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-4 tracking-tight">
            Nuestros Productos
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Explora nuestro catálogo de artículos de alta tecnología. Encuentra
            exactamente lo que necesitas para tu setup.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-10 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6">
            
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Buscar modelos, colores, accesorios..." 
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              {/* Categoría */}
              <select 
                value={localCategory}
                onChange={(e) => setLocalCategory(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all appearance-none cursor-pointer flex-1 md:w-40"
              >
                <option value="">Categorías</option>
                <option value="iPhone">iPhone</option>
                <option value="iPad">iPad</option>
                <option value="MacBook">MacBook</option>
                <option value="Samsung">Samsung</option>
                <option value="Accesorios">Accesorios</option>
              </select>

              {/* Condición */}
              <select 
                value={localCondition}
                onChange={(e) => setLocalCondition(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all appearance-none cursor-pointer flex-1 md:w-40"
              >
                <option value="">Condición</option>
                <option value="NUEVO">Nuevo</option>
                <option value="USADO">Usado</option>
              </select>

              {/* Rango de Precios */}
              <div className="flex items-center gap-2 flex-1 md:w-auto">
                <input 
                  type="number" 
                  placeholder="Min $" 
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                  className="w-24 bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-black focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all placeholder:text-gray-400"
                />
                <span className="text-gray-400">-</span>
                <input 
                  type="number" 
                  placeholder="Max $" 
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  className="w-24 bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-black focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Ordenar Por */}
              <div className="relative flex-1 md:w-48">
                <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-black focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="recent">Más recientes</option>
                  <option value="price_asc">Menor precio</option>
                  <option value="price_desc">Mayor precio</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
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
