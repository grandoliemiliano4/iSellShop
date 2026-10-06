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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const productData = await productService.getProductById(productId);
        setProduct(productData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  return <ProductDetailsView product={product} isLoading={isLoading} error={error} />;
}
