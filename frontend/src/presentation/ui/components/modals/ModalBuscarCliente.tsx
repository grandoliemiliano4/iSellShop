import React, { useState, useMemo } from "react";
import { Button } from "../shadcn-ui/button";
import { useClients } from "../../../../hooks/useClients";
import { Client } from "../../../../core/domain/entities/client.entity";
import { Search, X, Edit2 } from "lucide-react";

interface ModalBuscarClienteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (client: Client) => void;
}

export function ModalBuscarCliente({ isOpen, onClose, onSelect }: ModalBuscarClienteProps) {
  const [search, setSearch] = useState("");
  const [isCreatingClient, setIsCreatingClient] = useState(false);
  const { clients, createClient, isCreating, isLoading } = useClients();

  const [newClient, setNewClient] = useState({
    nombre: "",
    tel: "",
    ciudad: "",
    dni: "",
    sexo: "",
  });

  const filteredClients = useMemo(() => {
    if (!search) return clients;
    return clients.filter(c => 
      c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.dni?.includes(search)
    );
  }, [clients, search]);

  if (!isOpen) return null;

  const handleCreateClient = async () => {
    try {
      const payload = {
        nombre: newClient.nombre,
        tel: newClient.tel || undefined,
        ciudad: newClient.ciudad || undefined,
        dni: newClient.dni || undefined,
        sexo: newClient.sexo || undefined,
      };
      const created = await createClient(payload as Client);
      onSelect(created);
      onClose();
    } catch (error) {
      alert("Error al crear cliente");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-lg shadow-2xl flex flex-col h-[70vh] max-h-[700px]">
        
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-lg font-bold text-white">
            {isCreatingClient ? "Nuevo Cliente" : "Buscar Cliente"}
          </h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isCreatingClient ? (
          <div className="p-4 flex-1 overflow-y-auto space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Nombre Completo *</label>
              <input type="text" value={newClient.nombre} onChange={e => setNewClient(prev => ({ ...prev, nombre: e.target.value }))} className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Teléfono</label>
              <input type="text" value={newClient.tel} onChange={e => setNewClient(prev => ({ ...prev, tel: e.target.value }))} className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">DNI</label>
              <input type="text" value={newClient.dni} onChange={e => setNewClient(prev => ({ ...prev, dni: e.target.value }))} className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Ciudad</label>
              <input type="text" value={newClient.ciudad} onChange={e => setNewClient(prev => ({ ...prev, ciudad: e.target.value }))} className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white" />
            </div>
          </div>
        ) : (
          <>
            <div className="p-4 border-b border-zinc-800 flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input 
                  type="text"
                  autoFocus
                  placeholder="Buscar por nombre o DNI..." 
                  value={search} 
                  onChange={e => setSearch(e.target.value)} 
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-white outline-none focus:border-purple-500" 
                />
              </div>
              <Button onClick={() => setIsCreatingClient(true)} variant="outline" className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-200">
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {isLoading ? (
                <p className="text-center text-zinc-500 py-4">Cargando...</p>
              ) : filteredClients.length === 0 ? (
                <p className="text-center text-zinc-500 py-4">No se encontraron clientes.</p>
              ) : (
                <div className="space-y-1">
                  {filteredClients.map(c => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onSelect(c);
                        onClose();
                      }}
                      className="w-full text-left px-4 py-3 rounded-lg hover:bg-zinc-800 focus:bg-zinc-800 outline-none transition-colors group flex justify-between items-center"
                    >
                      <div>
                        <p className="text-sm font-medium text-zinc-200 group-hover:text-white">
                          {c.nombre}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {c.dni ? `DNI: ${c.dni} | ` : ''} {c.tel}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {isCreatingClient && (
          <div className="p-4 border-t border-zinc-800 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCreatingClient(false)} className="border-zinc-700 hover:bg-zinc-800 text-zinc-300">
              Volver a buscar
            </Button>
            <Button onClick={handleCreateClient} disabled={isCreating || !newClient.nombre} className="bg-purple-600 hover:bg-purple-700 text-white">
              Guardar Cliente
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}
