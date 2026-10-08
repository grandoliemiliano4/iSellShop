"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "../../core/domain/entities/product.entity";
import { ProductsManagerView } from "../views/ProductsManagerView";

export function ProductsManagerUseCase() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const editProductId = searchParams.get("editProduct");
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  const { products, isLoading, saveProduct, deleteProduct } = useProducts(
    1,
    50,
  );
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null as File | string | null,
    category: "",
    condition: "",
    stock: "",
    capacity: "",
    color: "",
    imei: "",
    bateria: "",
    bordes: "NORMAL",
    microfono: true,
    pantalla: true,
    camara_trasera: true,
    camara_frontal: true,
    parlante: true,
    face_id: true,
    descripcion_usado: "",
    garantia_hasta: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  useEffect(() => {
    if (editProductId && products.length > 0 && !hasAutoOpened) {
      const product = products.find((p) => p.id === Number(editProductId));
      if (product) {
        openModal(product);
        setHasAutoOpened(true);

        // Limpiar URL para que no se reabra al recargar
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.delete("editProduct");
        router.replace(`${pathname}?${newSearchParams.toString()}`, {
          scroll: false,
        });
      }
    }
  }, [editProductId, products, hasAutoOpened, router, pathname, searchParams]);

  const openModal = (product?: Product) => {
    setIsSuccess(false);
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        image: product.image,
        category: product.category || "",
        condition: product.condition || "",
        stock: product.stock?.toString() || "",
        capacity: product.capacity || "",
        color: product.color || "",
        imei: product.usedDetail?.imei || "",
        bateria: product.usedDetail?.bateria?.toString() || "",
        bordes: product.usedDetail?.bordes || "NORMAL",
        microfono: product.usedDetail?.microfono ?? true,
        pantalla: product.usedDetail?.pantalla ?? true,
        camara_trasera: product.usedDetail?.camara_trasera ?? true,
        camara_frontal: product.usedDetail?.camara_frontal ?? true,
        parlante: product.usedDetail?.parlante ?? true,
        face_id: product.usedDetail?.face_id ?? true,
        descripcion_usado: product.usedDetail?.descripcion || "",
        garantia_hasta: product.usedDetail?.garantia_hasta
          ? new Date(product.usedDetail.garantia_hasta)
              .toISOString()
              .slice(0, 10)
          : "",
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        description: "",
        price: "",
        image: null,
        category: "",
        condition: "",
        stock: "",
        capacity: "",
        color: "",
        imei: "",
        bateria: "",
        bordes: "NORMAL",
        microfono: true,
        pantalla: true,
        camara_trasera: true,
        camara_frontal: true,
        parlante: true,
        face_id: true,
        descripcion_usado: "",
        garantia_hasta: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setIsSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload: any = {
        ...formData,
        price: Number(formData.price),
        stock: formData.stock ? Number(formData.stock) : 1,
        id: editingProduct?.id,
      };

      if (formData.condition === "USADO") {
        payload.bateria = formData.bateria
          ? Number(formData.bateria)
          : undefined;
      }

      await saveProduct(payload);
      setIsSuccess(true);
      // Opcional: auto cerrar después de 2s
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (err) {
      // Error manejado en useProducts
    } finally {
      setIsSubmitting(false);
    }
  };

  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  const openDeleteModal = (product: Product) => {
    setIsDeleteSuccess(false);
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
    setIsDeleteSuccess(false);
  };

  const confirmDelete = async () => {
    if (!productToDelete?.id) return;
    setIsDeleting(true);
    try {
      await deleteProduct(productToDelete.id);
      setIsDeleteSuccess(true);
      setTimeout(() => {
        closeDeleteModal();
      }, 2000);
    } catch (error) {
      // Error manejado en hook
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ProductsManagerView
      products={products}
      isLoading={isLoading}
      editingProduct={editingProduct}
      formData={formData}
      isModalOpen={isModalOpen}
      setFormData={setFormData}
      openModal={openModal}
      closeModal={closeModal}
      handleSubmit={handleSubmit}
      handleDelete={openDeleteModal}
      isSubmitting={isSubmitting}
      isSuccess={isSuccess}
      detailProduct={detailProduct}
      setDetailProduct={setDetailProduct}
      isDeleteModalOpen={isDeleteModalOpen}
      closeDeleteModal={closeDeleteModal}
      productToDelete={productToDelete}
      confirmDelete={confirmDelete}
      isDeleting={isDeleting}
      isDeleteSuccess={isDeleteSuccess}
      isFormDirty={true}
    />
  );
}
