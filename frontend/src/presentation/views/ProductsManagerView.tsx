import React from 'react';
import { Product } from '../../core/domain/entities/product.entity';
import { DataTable } from '../ui/components/DataTable';
import { ModalEditarProducto } from '../ui/components/modals/ModalEditarProducto';
import { ModalDelete } from '../ui/components/modals/ModalDelete';

interface ProductsManagerViewProps {
  products: Product[];
  isLoading: boolean;
  editingProduct: Product | null;
  formData: {
    name: string;
    description: string;
    price: string;
    image: File | string | null;
    category: string;
    condition: string;
  };
  isModalOpen: boolean;
  setFormData: (data: any) => void;
  openModal: (product?: Product) => void;
  closeModal: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleDelete: (product: Product) => void;
  isSubmitting: boolean;
  isSuccess: boolean;
  
  isDeleteModalOpen: boolean;
  closeDeleteModal: () => void;
  productToDelete: Product | null;
  confirmDelete: () => void;
  isDeleting: boolean;
  isDeleteSuccess: boolean;
  isFormDirty: boolean;
}

export function ProductsManagerView({
  products,
  isLoading,
  editingProduct,
  formData,
  isModalOpen,
  setFormData,
  openModal,
  closeModal,
  handleSubmit,
  handleDelete,
  isSubmitting,
  isSuccess,
  isDeleteModalOpen,
  closeDeleteModal,
  productToDelete,
  confirmDelete,
  isDeleting,
  isDeleteSuccess,
  isFormDirty
}: ProductsManagerViewProps) {
  return (
    <div className="w-full max-w-6xl mx-auto bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
        <h2 className="text-xl font-bold text-gray-200">Gestión de Productos</h2>
        <button 
          onClick={() => openModal()}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-900/20"
        >
          + Nuevo Producto
        </button>
      </div>

      <div className="p-4">
        <DataTable
          data={products}
          isLoading={isLoading}
          keyExtractor={(item) => item.id!}
          columns={[
            {
              header: "ID",
              cell: (product) => <span className="text-gray-400">#{product.id}</span>,
            },
            {
              header: "Nombre",
              cell: (product) => <span className="font-medium text-gray-200">{product.name}</span>,
            },
            {
              header: "Precio",
              cell: (product) => <span className="text-green-400 font-semibold">${product.price}</span>,
            },
            {
              header: "Categoría",
              cell: (product) => (
                <span className="text-gray-400">
                  {product.category}
                  <span className="ml-2 px-2 py-0.5 bg-cyan-600/20 text-cyan-400 text-xs rounded border border-cyan-500/30">
                    {product.condition || 'NUEVO'}
                  </span>
                </span>
              ),
            },
            {
              header: "Acciones",
              className: "text-right",
              cell: (product) => (
                <div className="space-x-3 flex justify-end">
                  <button onClick={() => openModal(product)} className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">Editar</button>
                  <button onClick={() => handleDelete(product)} className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">Eliminar</button>
                </div>
              ),
            },
          ]}
        />
      </div>

      <ModalEditarProducto
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        editingProduct={editingProduct}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isSuccess={isSuccess}
        isFormDirty={isFormDirty}
      />
      
      <ModalDelete 
        isOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        item={productToDelete}
        itemType="producto"
        handleConfirm={confirmDelete}
        isDeleting={isDeleting}
        isSuccess={isDeleteSuccess}
      />
    </div>
  );
}
