'use client';

import React, { useState, useEffect } from 'react';
import { ProductDetailsView } from '../views/ProductDetailsView';
import { Product } from '../../core/domain/entities/product.entity';
import productService from '../../core/application/services/product.service';

interface ProductDetailsUseCaseProps {
  productId: number;
}

export function ProductDetailsUseCase({ productId }: ProductDetailsUseCaseProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [variations, setVariations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const productData = await productService.getProductById(productId);
        setProduct(productData);

        if (productData.condition === 'NUEVO') {
          const vars = await productService.getProducts(1, 100, productData.name, '', 'NUEVO');
          // Filtrar estrictamente por nombre exacto para evitar coincidencias parciales
          setVariations(vars.data.filter(p => p.name.toLowerCase() === productData.name.toLowerCase()));
        } else {
          setVariations([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  return <ProductDetailsView product={product} isLoading={isLoading} error={error} variations={variations} />;
}
