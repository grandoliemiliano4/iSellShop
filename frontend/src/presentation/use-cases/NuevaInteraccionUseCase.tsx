import React, { useState, useEffect } from "react";
import { ModalNuevaInteraccion } from "../ui/components/modals/ModalNuevaInteraccion";
import { useReservations } from "../../hooks/useReservations";
import { useAuthContext } from "../providers/AuthTokenProvider";

interface NuevaInteraccionUseCaseProps {
  isOpen: boolean;
  onClose: () => void;
  editingReservation?: any;
}

export function NuevaInteraccionUseCase({ isOpen, onClose, editingReservation }: NuevaInteraccionUseCaseProps) {
  const { createReservation, updateReservation } = useReservations();
  const { userRole } = useAuthContext();

  const defaultForm = {
    productId: "",
    clientId: "",
    status: "Pendiente",
    observations: "",
    tipo_interaccion: "Personal",
    canal_venta: "",
    date_retiro: "",
    descuento: "",
    comision: "",
    reservedAt: "",
  };

  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => {
    if (editingReservation && isOpen) {
      setFormData({
        productId: editingReservation.product?.id?.toString() || "",
        clientId: editingReservation.client?.id?.toString() || "",
        status: editingReservation.status,
        observations: editingReservation.observations || "",
        tipo_interaccion: editingReservation.tipo_interaccion,
        canal_venta: editingReservation.canal_venta || "",
        date_retiro: editingReservation.date_retiro ? new Date(editingReservation.date_retiro).toISOString().slice(0, 16) : "",
        descuento: editingReservation.descuento?.toString() || "",
        comision: editingReservation.comision?.toString() || "",
        reservedAt: editingReservation.reservedAt ? new Date(editingReservation.reservedAt).toISOString().slice(0, 10) : "",
      });
    } else if (isOpen) {
      setFormData(defaultForm);
    }
  }, [editingReservation, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProductSelect = (productId: number | null) => {
    setFormData(prev => ({ ...prev, productId: productId ? productId.toString() : "" }));
  };

  const handleClientSelect = (clientId: number | null) => {
    setFormData(prev => ({ ...prev, clientId: clientId ? clientId.toString() : "" }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productId) return alert("Selecciona un producto");
    if (!formData.clientId) return alert("Selecciona un cliente");

    try {
      const payload: any = {
        productId: Number(formData.productId),
        clientId: Number(formData.clientId),
        userId: 1, // <--- TODO: Fetch from auth state
        status: formData.status,
        observations: formData.observations,
        tipo_interaccion: formData.tipo_interaccion,
        canal_venta: formData.canal_venta,
        date_retiro: formData.date_retiro || undefined,
        descuento: formData.descuento ? Number(formData.descuento) : undefined,
      };

      if (userRole === "ADMIN") {
        payload.comision = formData.comision ? Number(formData.comision) : undefined;
        if (formData.reservedAt) {
          payload.reservedAt = new Date(formData.reservedAt).toISOString();
        }
      }

      if (editingReservation) {
        if (!updateReservation) throw new Error("updateReservation no está disponible");
        await updateReservation({ id: editingReservation.id, ...payload });
      } else {
        await createReservation(payload);
      }
      onClose(); // Cerrar modal después de crear exitosamente
    } catch (error) {
      alert("Ocurrió un error al guardar la interacción");
    }
  };

  const initialProductName = editingReservation?.product 
    ? `${editingReservation.product.name} ${editingReservation.product.capacity ? editingReservation.product.capacity + 'GB ' : ''}${editingReservation.product.color || ''}`
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
      initialProductName={initialProductName}
      initialClientName={initialClientName}
    />
  );
}
