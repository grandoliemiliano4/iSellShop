import React, { useState } from "react";
import { Button } from "../shadcn-ui/button";
import { Search, X } from "lucide-react";
import { ModalBuscarProducto } from "./ModalBuscarProducto";
import { ModalBuscarCliente } from "./ModalBuscarCliente";

interface ModalNuevaInteraccionProps {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onProductSelect: (productId: number | null) => void;
  onClientSelect: (clientId: number | null) => void;
  onSave: (e: React.FormEvent) => void;
}

export function ModalNuevaInteraccion({ 
  isOpen, 
  onClose, 
  formData, 
  onChange, 
  onProductSelect,
  onClientSelect,
  onSave 
}: ModalNuevaInteraccionProps) {
  
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  // States just for displaying selected names (we could pass them from useCase but for simplicity we can just show ID if name is missing, or manage it here)
  const [selectedProductName, setSelectedProductName] = useState("");
  const [selectedClientName, setSelectedClientName] = useState("");

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold text-white mb-4">Nueva Interacción / Reserva</h2>
          
          <form onSubmit={onSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Selector de Producto */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Producto *</label>
                {formData.productId ? (
                  <div className="flex items-center justify-between w-full bg-purple-900/20 border border-purple-500/30 rounded-lg px-3 py-2 text-white">
                    <span className="text-sm truncate">{selectedProductName || `ID: ${formData.productId}`}</span>
                    <button type="button" onClick={() => { onProductSelect(null); setSelectedProductName(""); }} className="text-zinc-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <Button type="button" onClick={() => setIsProductModalOpen(true)} variant="outline" className="w-full justify-start text-zinc-400 border-zinc-800 bg-zinc-950 hover:bg-zinc-800 hover:text-white">
                    <Search className="w-4 h-4 mr-2" /> Seleccionar Producto...
                  </Button>
                )}
              </div>

              {/* Selector de Cliente */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Cliente *</label>
                {formData.clientId ? (
                  <div className="flex items-center justify-between w-full bg-purple-900/20 border border-purple-500/30 rounded-lg px-3 py-2 text-white">
                    <span className="text-sm truncate">{selectedClientName || `ID: ${formData.clientId}`}</span>
                    <button type="button" onClick={() => { onClientSelect(null); setSelectedClientName(""); }} className="text-zinc-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <Button type="button" onClick={() => setIsClientModalOpen(true)} variant="outline" className="w-full justify-start text-zinc-400 border-zinc-800 bg-zinc-950 hover:bg-zinc-800 hover:text-white">
                    <Search className="w-4 h-4 mr-2" /> Seleccionar Cliente...
                  </Button>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Estado</label>
                <select name="status" value={formData.status} onChange={onChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white outline-none focus:border-purple-500">
                  <option value="Pendiente">Pendiente</option>
                  <option value="Reservó">Reservó</option>
                  <option value="Finalizado">Finalizado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Tipo de Interacción</label>
                <select name="tipo_interaccion" value={formData.tipo_interaccion} onChange={onChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white outline-none focus:border-purple-500">
                  <option value="Personal">Personal</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Llamada">Llamada</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Canal de Venta</label>
                <input type="text" name="canal_venta" value={formData.canal_venta} onChange={onChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white outline-none focus:border-purple-500" placeholder="Ej. Web, Redes" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Fecha de Retiro</label>
                <input type="datetime-local" name="date_retiro" value={formData.date_retiro} onChange={onChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white outline-none focus:border-purple-500 [color-scheme:dark]" />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Descuento ($)</label>
                <input type="number" step="0.01" name="descuento" value={formData.descuento} onChange={onChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Comisión ($)</label>
                <input type="number" step="0.01" name="comision" value={formData.comision} onChange={onChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white outline-none focus:border-purple-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Observaciones</label>
              <textarea name="observations" value={formData.observations} onChange={onChange} rows={3} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white outline-none focus:border-purple-500" />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800 mt-4">
              <Button type="button" variant="outline" onClick={onClose} className="border-zinc-700 hover:bg-zinc-800 text-zinc-300">
                Cancelar
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold">
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
          onProductSelect(p.id);
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
