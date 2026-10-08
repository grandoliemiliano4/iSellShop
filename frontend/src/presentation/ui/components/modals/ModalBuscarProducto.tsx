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
      <div className="bg-white border border-gray-200 rounded-xl w-full max-w-lg shadow-2xl flex flex-col h-[60vh] max-h-[600px]">
        
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-black">Buscar Producto</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              autoFocus
              placeholder="Buscar por modelo o nombre..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              className="w-full bg-white border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-black outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500" 
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {isLoading ? (
            <p className="text-center text-gray-500 py-4">Buscando...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No se encontraron productos.</p>
          ) : (
            <div className="space-y-1">
              {(() => {
                const result: any[] = [];
                const nuevosMap = new Map<string, any>();

                products.forEach(p => {
                  if (p.condition === 'USADO') {
                    result.push({ isGroup: false, product: p });
                  } else {
                    const key = `${p.name}-${p.capacity || ''}`;
                    if (!nuevosMap.has(key)) {
                      nuevosMap.set(key, { isGroup: true, key, name: p.name, capacity: p.capacity, condition: p.condition, items: [] });
                    }
                    nuevosMap.get(key).items.push(p);
                  }
                });

                const grouped = [...result, ...Array.from(nuevosMap.values())];

                return grouped.map((item, idx) => {
                  if (!item.isGroup) {
                    const p = item.product;
                    return (
                      <div
                        key={`usado-${p.id}`}
                        onClick={() => {
                          onSelect(p);
                          onClose();
                        }}
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group flex justify-between items-center"
                      >
                        <div>
                          <p className="text-sm font-medium text-black">
                            {p.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {p.capacity ? `${p.capacity}GB | ` : ''}{p.condition} {p.color ? `| ${p.color}` : ''}
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-cyan-600">Stock: {p.stock}</span>
                      </div>
                    );
                  } else {
                    const group = item;
                    return (
                      <div
                        key={`nuevo-${group.key}`}
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex justify-between items-center"
                      >
                        <div className="flex-1 cursor-pointer" onClick={() => {
                           const selectEl = document.getElementById(`select-${group.key}`) as HTMLSelectElement;
                           const selectedId = selectEl ? Number(selectEl.value) : group.items[0].id;
                           const p = group.items.find((x: any) => x.id === selectedId) || group.items[0];
                           onSelect(p);
                           onClose();
                        }}>
                          <p className="text-sm font-medium text-black">
                            {group.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {group.capacity ? `${group.capacity}GB | ` : ''}{group.condition}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <select 
                            id={`select-${group.key}`}
                            className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-black outline-none cursor-pointer focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {group.items.map((p: any) => (
                              <option key={p.id} value={p.id}>
                                {p.color || 'Sin Color'} (St: {p.stock})
                              </option>
                            ))}
                          </select>
                          
                          <Button 
                            size="sm"
                            className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs px-2 h-7"
                            onClick={(e) => {
                               e.stopPropagation();
                               const selectEl = document.getElementById(`select-${group.key}`) as HTMLSelectElement;
                               const selectedId = selectEl ? Number(selectEl.value) : group.items[0].id;
                               const p = group.items.find((x: any) => x.id === selectedId) || group.items[0];
                               onSelect(p);
                               onClose();
                            }}
                          >
                            Elegir
                          </Button>
                        </div>
                      </div>
                    );
                  }
                });
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
