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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white border border-gray-200 rounded-xl w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-50 text-green-600 border border-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-black">¡Éxito!</h3>
            <p className="text-gray-500">
              El producto se ha {editingProduct ? 'editado' : 'creado'} correctamente.
            </p>
            <button 
              onClick={closeModal}
              className="mt-6 w-full px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-black border border-gray-200 font-medium transition-colors"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-gray-200 bg-gray-50 shrink-0">
              <h3 className="text-lg font-bold text-black">
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
              <div className="flex gap-4">
                <div className="flex-[2]">
                  <label className="block text-sm text-gray-700 font-medium mb-1">Nombre</label>
                  <input 
                    required 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-black focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all" 
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-700 font-medium mb-1">Precio ($)</label>
                  <input 
                    required 
                    type="number" 
                    step="0.01" 
                    min="0" 
                    value={formData.price} 
                    onChange={e => setFormData({...formData, price: e.target.value})} 
                    className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-black focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 font-medium mb-1">Descripción</label>
                <textarea 
                  required 
                  rows={2} 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-black focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all resize-none" 
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-700 font-medium mb-1">Categoría</label>
                  <select 
                    required 
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value})} 
                    className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-black focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                  >
                    <option value="" disabled>Seleccione...</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-700 font-medium mb-1">Condición</label>
                  <select 
                    required 
                    value={formData.condition} 
                    onChange={e => setFormData({...formData, condition: e.target.value})} 
                    className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-black focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                  >
                    <option value="" disabled>Seleccione...</option>
                    <option value="NUEVO">Nuevo</option>
                    <option value="USADO">Usado</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-700 font-medium mb-1">Stock</label>
                  <input 
                    type="number" 
                    min="0" 
                    value={formData.stock ?? ''} 
                    onChange={e => setFormData({...formData, stock: e.target.value})} 
                    className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-black focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all" 
                    placeholder="Cant..."
                  />
                </div>
              </div>

              {formData.condition === 'USADO' && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-4 animate-in fade-in slide-in-from-top-2">
                  <h4 className="text-sm font-semibold text-cyan-700 border-b border-gray-200 pb-2">Detalles del Equipo Usado</h4>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">IMEI</label>
                      <input 
                        required={formData.condition === 'USADO'}
                        type="text" 
                        value={formData.imei ?? ''} 
                        onChange={e => setFormData({...formData, imei: e.target.value})} 
                        className="w-full bg-white border border-gray-300 rounded-lg p-2 text-sm text-black focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all" 
                        placeholder="Obligatorio"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Batería (%)</label>
                      <input 
                        type="number" 
                        min="0" 
                        max="100"
                        value={formData.bateria ?? ''} 
                        onChange={e => setFormData({...formData, bateria: e.target.value})} 
                        className="w-full bg-white border border-gray-300 rounded-lg p-2 text-sm text-black focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all" 
                        placeholder="100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Bordes</label>
                      <select 
                        value={formData.bordes ?? 'NORMAL'} 
                        onChange={e => setFormData({...formData, bordes: e.target.value})} 
                        className="w-full bg-white border border-gray-300 rounded-lg p-2 text-sm text-black focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                      >
                        <option value="NORMAL">Normal</option>
                        <option value="CASCADO">Cascado</option>
                        <option value="RAYADO">Rayado</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { key: 'microfono', label: 'Micrófono' },
                      { key: 'pantalla', label: 'Pantalla' },
                      { key: 'camara_trasera', label: 'Cámara Trasera' },
                      { key: 'camara_frontal', label: 'Cámara Frontal' },
                      { key: 'parlante', label: 'Parlante' },
                      { key: 'face_id', label: 'Face ID' },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={(formData as any)[key] ?? true} 
                          onChange={e => setFormData({...formData, [key]: e.target.checked})}
                          className="w-4 h-4 rounded bg-white border-gray-300 text-cyan-600 focus:ring-cyan-500/20 cursor-pointer"
                        />
                        <span className="text-xs text-gray-600 group-hover:text-black transition-colors">{label}</span>
                      </label>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Garantía Hasta (Opcional)</label>
                      <input 
                        type="date" 
                        value={formData.garantia_hasta ?? ''} 
                        onChange={e => setFormData({...formData, garantia_hasta: e.target.value})} 
                        className="w-full bg-white border border-gray-300 rounded-lg p-2 text-sm text-black focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all [color-scheme:light]" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Descripción del Estado</label>
                      <input 
                        type="text" 
                        value={formData.descripcion_usado ?? ''} 
                        onChange={e => setFormData({...formData, descripcion_usado: e.target.value})} 
                        className="w-full bg-white border border-gray-300 rounded-lg p-2 text-sm text-black focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all" 
                        placeholder="Ej. Raspones leves..."
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-700 font-medium mb-1">Imagen (URL o Archivo)</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="text" 
                    placeholder="https://ejemplo.com/imagen.jpg"
                    value={typeof formData.image === 'string' ? formData.image : ''}
                    onChange={e => setFormData({...formData, image: e.target.value})} 
                    className="flex-1 bg-white border border-gray-300 rounded-lg p-2.5 text-black focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                  />
                  <div className="flex items-center bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 px-3 transition-colors cursor-pointer relative overflow-hidden">
                    <span className="text-sm font-medium text-cyan-700 py-2.5 whitespace-nowrap">Subir archivo</span>
                    <input 
                      type="file" 
                      accept="image/jpeg, image/png, image/webp, image/heic, image/heif, .heic, .heif" 
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          setFormData({...formData, image: e.target.files[0]});
                        }
                      }} 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-200 flex justify-end gap-3 shrink-0 bg-white sticky bottom-0 z-10 py-2">
                <button 
                  type="button" 
                  onClick={closeModal} 
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 transition-colors font-medium disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting || !isFormDirty}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2 ${
                    !isFormDirty || isSubmitting 
                      ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none' 
                      : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white/70" fill="none" viewBox="0 0 24 24">
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
