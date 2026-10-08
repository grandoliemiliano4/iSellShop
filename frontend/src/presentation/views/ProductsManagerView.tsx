import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Product } from "../../core/domain/entities/product.entity";
import { DataTable } from "../ui/components/DataTable";
import { ModalEditarProducto } from "../ui/components/modals/ModalEditarProducto";
import { ModalDelete } from "../ui/components/modals/ModalDelete";
import { ProductDashboardDetailView } from "./ProductDashboardDetailView";

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
    stock?: number | string;
    capacity?: string;
    color?: string;
  };
  isModalOpen: boolean;
  setFormData: (data: any) => void;
  openModal: (product?: Product) => void;
  closeModal: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleDelete: (product: Product) => void;
  isSubmitting: boolean;
  isSuccess: boolean;

  detailProduct: Product | null;
  setDetailProduct: (product: Product | null) => void;

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
  detailProduct,
  setDetailProduct,
  isDeleteModalOpen,
  closeDeleteModal,
  productToDelete,
  confirmDelete,
  isDeleting,
  isDeleteSuccess,
  isFormDirty,
}: ProductsManagerViewProps) {
  return (
    <div className="w-full max-w-6xl mx-auto bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h2 className="text-xl font-bold text-black">
          Gestión de Productos
        </h2>
        <button
          onClick={() => openModal()}
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          + Nuevo Producto
        </button>
      </div>

      <div className="p-4">
        <DataTable
          data={products}
          isLoading={isLoading}
          keyExtractor={(item) => item.id!}
          onRowClick={(product) => setDetailProduct(product)}
          columns={[
            {
              header: "ID",
              cell: (product) => (
                <span className="text-gray-500">#{product.id}</span>
              ),
            },
            {
              header: "Nombre",
              cell: (product) => (
                <span className="font-medium text-black">
                  {product.name}
                </span>
              ),
            },
            {
              header: "Capacidad",
              cell: (product) => (
                <span className="text-gray-500">
                  {product.capacity ? `${product.capacity}GB` : "-"}
                </span>
              ),
            },
            {
              header: "Color",
              cell: (product) => (
                <span className="text-gray-500">{product.color || "-"}</span>
              ),
            },
            {
              header: "Precio",
              cell: (product) => (
                <span className="text-gray-700 font-semibold">
                  ${product.price}
                </span>
              ),
            },
            {
              header: "Stock",
              cell: (product) => (
                <span className={`font-semibold text-gray-700`}>
                  {product.stock ?? 1}
                </span>
              ),
            },
            {
              header: "Categoría",
              cell: (product) => (
                <span className="text-gray-500">{product.category}</span>
              ),
            },
            {
              header: "Condición",
              cell: (product) => (
                <span className="text-gray-500">
                  {product.condition || "NUEVO"}
                </span>
              ),
            },
            {
              header: "Detalles Usado",
              cell: (product) => (
                <span className="text-gray-500 text-xs">
                  {product.condition === 'USADO' && product.usedDetail 
                    ? `IMEI: ${product.usedDetail.imei} | Bat: ${product.usedDetail.bateria}%`
                    : "-"}
                </span>
              ),
            },
            {
              header: "Acciones",
              className: "text-right",
              cell: (product) => (
                <div className="space-x-3 flex justify-end">
                  <button
                    onClick={(e) => { e.stopPropagation(); openModal(product); }}
                    className="text-gray-400 hover:text-cyan-600 p-1 hover:bg-cyan-50 rounded transition-colors"
                    title="Editar"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(product); }}
                    className="text-gray-400 hover:text-red-600 p-1 hover:bg-red-50 rounded transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ),
            },
          ]}
        />
      </div>

      <ProductDashboardDetailView 
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
      />

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
