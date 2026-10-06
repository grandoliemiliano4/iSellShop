import React from 'react';
import { Product } from '../../../../core/domain/entities/product.entity';

const CATEGORIES = ['iPhone', 'iPad', 'MacBook', 'Samsung', 'Accesorios', 'Otro'];

interface ModalEditarProductoProps {
  isModalOpen: boolean;
  closeModal: () => void;
  editingProduct: Product | null;
  formData: {
    name: string;
    description: string;
    price: string;
    image: File | string | null;
    category: string;
    condition: string;
  };
  setFormData: (data: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
  isSuccess?: boolean;
  isFormDirty?: boolean;
}

export function ModalEditarProducto({
  isModalOpen,
  closeModal,
  editingProduct,
  formData,
  setFormData,
  handleSubmit,
  isSubmitting = false,
  isSuccess = false,
  isFormDirty = true
}: ModalEditarProductoProps) {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-200">¡Éxito!</h3>
            <p className="text-gray-400">
              El producto se ha {editingProduct ? 'editado' : 'creado'} correctamente.
            </p>
            <button 
              onClick={closeModal}
              className="mt-6 w-full px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-zinc-800">
              <h3 className="text-lg font-bold text-gray-200">
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Nombre</label>
                <input 
                  required 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-gray-200 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Descripción</label>
                <textarea 
                  required 
                  rows={3} 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                  className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-gray-200 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" 
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-400 mb-1">Precio</label>
                  <input 
                    required 
                    type="number" 
                    step="0.01" 
                    min="0" 
                    value={formData.price} 
                    onChange={e => setFormData({...formData, price: e.target.value})} 
                    className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-gray-200 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" 
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-400 mb-1">Categoría</label>
                  <select 
                    required 
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value})} 
                    className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-gray-200 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  >
                    <option value="" disabled>Seleccione...</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-400 mb-1">Condición</label>
                  <select 
                    required 
                    value={formData.condition} 
                    onChange={e => setFormData({...formData, condition: e.target.value})} 
                    className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-gray-200 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  >
                    <option value="" disabled>Seleccione...</option>
                    <option value="NUEVO">Nuevo</option>
                    <option value="USADO">Usado</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Imagen (URL o Archivo)</label>
                <div className="space-y-2">
                  <input 
                    type="text" 
                    placeholder="https://ejemplo.com/imagen.jpg"
                    value={typeof formData.image === 'string' ? formData.image : ''}
                    onChange={e => setFormData({...formData, image: e.target.value})} 
                    className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-gray-200 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">O subir archivo local:</span>
                    <input 
                      type="file" 
                      accept="image/jpeg, image/png, image/webp, image/heic, image/heif, .heic, .heif" 
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          setFormData({...formData, image: e.target.files[0]});
                        }
                      }} 
                      className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-indigo-400 hover:file:bg-zinc-700" 
                    />
                  </div>
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={closeModal} 
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-zinc-800 transition-colors font-medium disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting || !isFormDirty}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors shadow-lg flex items-center gap-2 ${
                    !isFormDirty || isSubmitting 
                      ? 'bg-zinc-700 text-gray-400 cursor-not-allowed shadow-none' 
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/20'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Guardando...
                    </>
                  ) : editingProduct ? 'Guardar Cambios' : 'Guardar Producto'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
