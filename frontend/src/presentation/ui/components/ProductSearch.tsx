'use client';

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type ProductSearchProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ProductSearch({ isOpen, onClose }: ProductSearchProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Build query params
    const params = new URLSearchParams();
    if (searchText) params.set('search', searchText);
    if (category) params.set('category', category);
    if (condition) params.set('condition', condition);

    router.push(`/?${params.toString()}`);
    onClose();
  };

  const handleClear = () => {
    setSearchText("");
    setCategory("");
    setCondition("");
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Overlay click area to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-3xl bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-zinc-800 bg-zinc-900/50">
          <h2 className="text-lg font-bold text-gray-200">Buscar Productos</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Barra de búsqueda con ícono */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="¿Qué estás buscando?"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-black border border-zinc-700 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-lg"
            />
            {searchText && (
              <button 
                type="button"
                onClick={() => setSearchText("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-red-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-2">Marca / Categoría</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-xl text-gray-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all cursor-pointer"
              >
                <option value="">Cualquier marca</option>
                <option value="iPhone">iPhone</option>
                <option value="iPad">iPad</option>
                <option value="MacBook">MacBook</option>
                <option value="Samsung">Samsung</option>
                <option value="Accesorios">Accesorios</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-2">Condición</label>
              <select 
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-xl text-gray-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all cursor-pointer"
              >
                <option value="">Cualquier estado</option>
                <option value="NUEVO">Nuevo</option>
                <option value="USADO">Usado</option>
              </select>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="pt-4 flex items-center justify-end gap-4 border-t border-zinc-800">
            <button 
              type="button" 
              onClick={handleClear}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Limpiar
            </button>
            <button 
              type="submit"
              className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-900/50"
            >
              Buscar Resultados
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
