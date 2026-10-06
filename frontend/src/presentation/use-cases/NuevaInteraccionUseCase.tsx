import React, { useState } from "react";
import { ModalNuevaInteraccion } from "../ui/components/modals/ModalNuevaInteraccion";
import { useReservations } from "../../hooks/useReservations";

interface NuevaInteraccionUseCaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NuevaInteraccionUseCase({ isOpen, onClose }: NuevaInteraccionUseCaseProps) {
  const { createReservation } = useReservations();

  const [formData, setFormData] = useState({
    productId: "",
    clientId: "",
    status: "Pendiente",
    observations: "",
    tipo_interaccion: "Personal",
    canal_venta: "",
    date_retiro: "",
    descuento: "",
    comision: "",
  });

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
      await createReservation({
        productId: Number(formData.productId),
        clientId: Number(formData.clientId),
        userId: 1, // <--- TODO: Fetch from auth state
        status: formData.status,
        observations: formData.observations,
        tipo_interaccion: formData.tipo_interaccion,
        canal_venta: formData.canal_venta,
        date_retiro: formData.date_retiro || undefined,
        descuento: formData.descuento ? Number(formData.descuento) : undefined,
        comision: formData.comision ? Number(formData.comision) : undefined,
      });
      onClose(); // Cerrar modal después de crear exitosamente
    } catch (error) {
      alert("Ocurrió un error al guardar la interacción");
    }
  };

  return (
    <ModalNuevaInteraccion 
      isOpen={isOpen}
      onClose={onClose}
      formData={formData}
      onChange={handleChange}
      onProductSelect={handleProductSelect}
      onClientSelect={handleClientSelect}
      onSave={handleSave}
    />
  );
}
