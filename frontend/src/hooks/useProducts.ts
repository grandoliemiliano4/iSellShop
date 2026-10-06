import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Product } from '../core/domain/entities/product.entity';
import productService from '../core/application/services/product.service';

export function useProducts(
  page: number = 1, 
  limit: number = 12, 
  search: string = '', 
  category: string = '', 
  condition: string = '',
  minPrice?: number,
  maxPrice?: number,
  sortBy?: string
) {
  const queryClient = useQueryClient();

  // 1. Fetching con useQuery
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['products', { page, limit, search, category, condition, minPrice, maxPrice, sortBy }],
    queryFn: () => productService.getProducts(page, limit, search, category, condition, minPrice, maxPrice, sortBy),
  });

  const products = data?.data || [];
  const total = data?.total || 0;
  const lastPage = data?.lastPage || 1;
  const errorMessage = error instanceof Error ? error.message : null;

  // 2. Mutations
  const saveMutation = useMutation({
    mutationFn: async (productData: any) => {
      if (productData.price) {
        productData.price = Number(productData.price);
      }
      await productService.saveProduct(productData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (err: any) => {
      alert(`Error al guardar el producto:\n${err.message}`);
      throw err;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => productService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (err: any) => {
      alert(`Error al eliminar el producto:\n${err.message}`);
      throw err;
    },
  });

  return {
    products,
    isLoading,
    error: errorMessage,
    total,
    lastPage,
    saveProduct: saveMutation.mutateAsync,
    deleteProduct: deleteMutation.mutateAsync,
    fetchProducts: refetch,
  };
}
