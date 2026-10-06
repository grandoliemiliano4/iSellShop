import React, { useState } from "react";
import { Button } from "../shadcn-ui/button";
import { useProducts } from "../../../../hooks/useProducts";
import { Product } from "../../../../core/domain/entities/product.entity";
import { Search, X } from "lucide-react";

interface ModalBuscarProductoProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (product: Product) => void;
}

export function ModalBuscarProducto({ isOpen, onClose, onSelect }: ModalBuscarProductoProps) {
  const [search, setSearch] = useState("");
  const { products, isLoading } = useProducts(1, 50, search);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-lg shadow-2xl flex flex-col h-[60vh] max-h-[600px]">
        
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-lg font-bold text-white">Buscar Producto</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-zinc-800">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text"
              autoFocus
              placeholder="Buscar por modelo o nombre..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-white outline-none focus:border-purple-500" 
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {isLoading ? (
            <p className="text-center text-zinc-500 py-4">Buscando...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-zinc-500 py-4">No se encontraron productos.</p>
          ) : (
            <div className="space-y-1">
              {products.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    onSelect(p);
                    onClose();
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-zinc-800 focus:bg-zinc-800 outline-none transition-colors group flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-200 group-hover:text-white">
                      {p.name}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {p.capacity ? `${p.capacity}GB` : ''} {p.color ? `| ${p.color}` : ''} | {p.condition}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-purple-400">Stock: {p.stock}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
