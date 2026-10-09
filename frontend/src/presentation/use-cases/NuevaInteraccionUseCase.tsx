import React, { useState, useEffect } from "react";
import { ModalNuevaInteraccion } from "../ui/components/modals/ModalNuevaInteraccion";
import { useReservations } from "../../hooks/useReservations";
import { useAuthContext } from "../providers/AuthTokenProvider";
import { useUsers } from "../../hooks/useUsers";

interface NuevaInteraccionUseCaseProps {
  isOpen: boolean;
  onClose: () => void;
  editingReservation?: any;
}

export function NuevaInteraccionUseCase({
  isOpen,
  onClose,
  editingReservation,
}: NuevaInteraccionUseCaseProps) {
  const { createReservation, updateReservation } = useReservations();
  const { userRole, userId } = useAuthContext();
  const { users } = useUsers();

  const defaultForm = {
    productId: "",
    clientId: "",
    userId: "",
    status: "Pendiente",
    observations: "",
    tipo_interaccion: "Personal",
    canal_venta: "",
    date_retiro: "",
    descuento: "",
    comision: "",
    total: "",
    reservedAt: "",
  };

  const [formData, setFormData] = useState(defaultForm);
  const [productPrice, setProductPrice] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingReservation && isOpen) {
      const pPrice = editingReservation.product?.price || 0;
      setProductPrice(pPrice);
      setError(null);
      setFormData({
        productId: editingReservation.product?.id?.toString() || "",
        clientId: editingReservation.client?.id?.toString() || "",
        userId: editingReservation.user?.id?.toString() || userId?.toString() || "",
        status: editingReservation.status,
        observations: editingReservation.observations || "",
        tipo_interaccion: editingReservation.tipo_interaccion,
        canal_venta: editingReservation.canal_venta || "",
        date_retiro: editingReservation.date_retiro
          ? new Date(editingReservation.date_retiro).toISOString().slice(0, 16)
          : "",
        descuento: editingReservation.descuento?.toString() || "",
        comision: editingReservation.comision?.toString() || "",
        total: editingReservation.total?.toString() || (pPrice - (editingReservation.descuento || 0)).toString(),
        reservedAt: editingReservation.reservedAt
          ? new Date(editingReservation.reservedAt).toISOString().slice(0, 10)
          : "",
      });
    } else if (isOpen) {
      setFormData({ ...defaultForm, userId: userId?.toString() || "" });
      setProductPrice(0);
      setError(null);
    }
  }, [editingReservation, isOpen, userId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "descuento") {
        const desc = Number(value) || 0;
        next.total = (productPrice - desc).toString();
      }
      return next;
    });
  };

  const handleProductSelect = (productId: number | null, price?: number) => {
    const pPrice = price || 0;
    setProductPrice(pPrice);
    setFormData((prev) => ({
      ...prev,
      productId: productId ? productId.toString() : "",
      total: productId ? (pPrice - (Number(prev.descuento) || 0)).toString() : ""
    }));
  };

  const handleClientSelect = (clientId: number | null) => {
    setFormData((prev) => ({
      ...prev,
      clientId: clientId ? clientId.toString() : "",
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.productId) return setError("Selecciona un producto");
    if (!formData.clientId) return setError("Selecciona un cliente");
    if (!formData.userId) return setError("Selecciona un vendedor");

    try {
      const payload: any = {
        productId: Number(formData.productId),
        clientId: Number(formData.clientId),
        userId: Number(formData.userId),
        status: formData.status,
        observations: formData.observations,
        tipo_interaccion: formData.tipo_interaccion,
        canal_venta: formData.canal_venta,
        date_retiro: formData.date_retiro ? new Date(formData.date_retiro).toISOString() : undefined,
        descuento: formData.descuento ? Number(formData.descuento) : undefined,
        total: formData.total ? Number(formData.total) : undefined,
      };

      if (userRole === "ADMIN") {
        payload.comision = formData.comision
          ? Number(formData.comision)
          : undefined;
        if (formData.reservedAt) {
          payload.reservedAt = new Date(formData.reservedAt).toISOString();
        }
      }

      if (editingReservation) {
        if (!updateReservation)
          throw new Error("updateReservation no está disponible");
        await updateReservation({ id: editingReservation.id, ...payload });
      } else {
        await createReservation(payload);
      }
      onClose(); // Cerrar modal después de crear exitosamente
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al guardar la interacción");
    }
  };

  const initialProductName = editingReservation?.product
    ? `${editingReservation.product.name} ${editingReservation.product.capacity ? editingReservation.product.capacity + "GB " : ""}${editingReservation.product.color || ""}`
    : "";

  const initialClientName = editingReservation?.client?.nombre || "";

  return (
    <ModalNuevaInteraccion
      isOpen={isOpen}
      onClose={onClose}
      formData={formData}
      onChange={handleChange}
      onProductSelect={handleProductSelect}
      onClientSelect={handleClientSelect}
      onSave={handleSave}
      isEditing={!!editingReservation}
      userRole={userRole}
      users={users}
      initialProductName={initialProductName}
      initialClientName={initialClientName}
      error={error}
    />
  );
}
