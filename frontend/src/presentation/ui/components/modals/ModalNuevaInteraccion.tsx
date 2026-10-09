import React, { useState } from "react";
import { Button } from "../shadcn-ui/button";
import { Search, X } from "lucide-react";
import { ModalBuscarProducto } from "./ModalBuscarProducto";
import { ModalBuscarCliente } from "./ModalBuscarCliente";

interface ModalNuevaInteraccionProps {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onProductSelect: (productId: number | null, productPrice?: number) => void;
  onClientSelect: (clientId: number | null) => void;
  onSave: (e: React.FormEvent) => void;
  isEditing?: boolean;
  userRole?: string | null;
  initialProductName?: string;
  initialClientName?: string;
  error?: string | null;
  users?: any[];
}

export function ModalNuevaInteraccion({
  isOpen,
  onClose,
  formData,
  onChange,
  onProductSelect,
  onClientSelect,
  onSave,
  isEditing = false,
  userRole,
  initialProductName = "",
  initialClientName = "",
  error = null,
  users = [],
}: ModalNuevaInteraccionProps) {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  // States just for displaying selected names
  const [selectedProductName, setSelectedProductName] =
    useState(initialProductName);
  const [selectedClientName, setSelectedClientName] =
    useState(initialClientName);

  // Sync state when modal opens or initial props change
  React.useEffect(() => {
    if (isOpen) {
      setSelectedProductName(initialProductName);
      setSelectedClientName(initialClientName);
    }
  }, [isOpen, initialProductName, initialClientName]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold text-black mb-4 border-b border-gray-200 pb-3">
            {isEditing ? "Editar Interacción" : "Nueva Interacción / Reserva"}
          </h2>

          <form onSubmit={onSave} className="space-y-6 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Selector de Producto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Producto *
                </label>
                {formData.productId ? (
                  <div className="flex items-center justify-between w-full bg-cyan-50 border border-cyan-200 rounded-lg px-3 py-2 text-cyan-800">
                    <span className="text-sm truncate font-medium">
                      {selectedProductName || `ID: ${formData.productId}`}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onProductSelect(null);
                        setSelectedProductName("");
                      }}
                      className="text-cyan-600 hover:text-cyan-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    onClick={() => setIsProductModalOpen(true)}
                    variant="outline"
                    className="w-full justify-start text-gray-500 border-gray-300 bg-white hover:bg-gray-50 hover:text-black"
                  >
                    <Search className="w-4 h-4 mr-2" /> Seleccionar Producto...
                  </Button>
                )}
              </div>

              {/* Selector de Cliente */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cliente *
                </label>
                {formData.clientId ? (
                  <div className="flex items-center justify-between w-full bg-cyan-50 border border-cyan-200 rounded-lg px-3 py-2 text-cyan-800">
                    <span className="text-sm truncate font-medium">
                      {selectedClientName || `ID: ${formData.clientId}`}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onClientSelect(null);
                        setSelectedClientName("");
                      }}
                      className="text-cyan-600 hover:text-cyan-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    onClick={() => setIsClientModalOpen(true)}
                    variant="outline"
                    className="w-full justify-start text-gray-500 border-gray-300 bg-white hover:bg-gray-50 hover:text-black"
                  >
                    <Search className="w-4 h-4 mr-2" /> Seleccionar Cliente...
                  </Button>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={onChange}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-black outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Reservó">Reservó</option>
                  <option value="Finalizado">Finalizado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Interacción
                </label>
                <select
                  name="tipo_interaccion"
                  value={formData.tipo_interaccion}
                  onChange={onChange}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-black outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="Personal">Personal</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Llamada">Llamada</option>
                </select>
              </div>

              {userRole === "ADMIN" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center justify-between">
                    Asignar Vendedor
                  </label>
                  <select
                    name="userId"
                    value={formData.userId || ""}
                    onChange={onChange}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-black outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="" disabled>
                      Seleccionar Vendedor...
                    </option>
                    {users
                      ?.filter((u) => u.role?.toLowerCase() === "vendedor")
                      .map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Canal de Venta
                </label>
                <input
                  type="text"
                  name="canal_venta"
                  value={formData.canal_venta}
                  onChange={onChange}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-black outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  placeholder="Ej. Web, Redes"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Retiro
                </label>
                <input
                  type="datetime-local"
                  name="date_retiro"
                  value={formData.date_retiro}
                  onChange={onChange}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-black outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 [color-scheme:light]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descuento ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="descuento"
                  value={formData.descuento}
                  onChange={onChange}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-black outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total a Pagar ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="total"
                  value={formData.total}
                  readOnly
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-500 outline-none cursor-not-allowed"
                />
              </div>

              {userRole === "ADMIN" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Comisión ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="comision"
                      value={formData.comision}
                      onChange={onChange}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-black outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Creado el
                    </label>
                    <input
                      type="date"
                      name="reservedAt"
                      value={formData.reservedAt}
                      onChange={onChange}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-black outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 [color-scheme:light]"
                    />
                  </div>
                </>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observaciones
              </label>
              <textarea
                name="observations"
                value={formData.observations}
                onChange={onChange}
                rows={3}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-black outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-gray-300 hover:bg-gray-50 text-gray-700"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold"
              >
                Guardar Interacción
              </Button>
            </div>
          </form>
        </div>
      </div>

      <ModalBuscarProducto
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSelect={(p) => {
          onProductSelect(p.id, p.price);
          setSelectedProductName(p.name);
        }}
      />

      <ModalBuscarCliente
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        onSelect={(c) => {
          onClientSelect(c.id);
          setSelectedClientName(c.nombre);
        }}
      />
    </>
  );
}
