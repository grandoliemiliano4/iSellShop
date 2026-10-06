import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Product } from "../../core/domain/entities/product.entity";
import { DataTable } from "../ui/components/DataTable";
import { ModalEditarProducto } from "../ui/components/modals/ModalEditarProducto";
import { ModalDelete } from "../ui/components/modals/ModalDelete";

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
    imei?: string;
    bateria?: number | string;
    microfono?: boolean;
    pantalla?: boolean;
    camara_trasera?: boolean;
    camara_frontal?: boolean;
    parlante?: boolean;
    face_id?: boolean;
    bordes?: string;
    descripcion_usado?: string;
    garantia_hasta?: string;
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
  isFormDirty,
}: ProductsManagerViewProps) {
  return (
    <div className="w-full max-w-6xl mx-auto bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
        <h2 className="text-xl font-bold text-zinc-200">
          Gestión de Productos
        </h2>
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
              cell: (product) => (
                <span className="text-zinc-400">#{product.id}</span>
              ),
            },
            {
              header: "Nombre",
              cell: (product) => (
                <span className="font-medium text-zinc-200">
                  {product.name}
                </span>
              ),
            },
            {
              header: "Capacidad",
              cell: (product) => (
                <span className="text-zinc-400">
                  {product.capacity ? `${product.capacity}GB` : "-"}
                </span>
              ),
            },
            {
              header: "Color",
              cell: (product) => (
                <span className="text-zinc-400">{product.color || "-"}</span>
              ),
            },
            {
              header: "Precio",
              cell: (product) => (
                <span className="text-zinc-300 font-semibold">
                  ${product.price}
                </span>
              ),
            },
            {
              header: "Stock",
              cell: (product) => (
                <span
                  className={`font-semibold text-zinc-300`}
                >
                  {product.stock ?? 1}
                </span>
              ),
            },
            {
              header: "Categoría",
              cell: (product) => (
                <span className="text-zinc-400">{product.category}</span>
              ),
            },
            {
              header: "Condición",
              cell: (product) => (
                <span className="text-zinc-400">
                  {product.condition || "NUEVO"}
                </span>
              ),
            },
            {
              header: "Descripción",
              cell: (product) => (
                <span
                  className="text-zinc-400 max-w-xs truncate inline-block"
                  title={product.description}
                >
                  {product.description}
                </span>
              ),
            },
            {
              header: "Acciones",
              className: "text-right",
              cell: (product) => (
                <div className="space-x-3 flex justify-end">
                  <button
                    onClick={() => openModal(product)}
                    className="text-zinc-400 hover:text-white p-1 hover:bg-zinc-800 rounded transition-colors"
                    title="Editar"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="text-zinc-400 hover:text-white p-1 hover:bg-zinc-800 rounded transition-colors"
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
