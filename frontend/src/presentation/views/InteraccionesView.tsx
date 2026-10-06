"use client";

import React, { useState } from "react";
import { useReservations } from "../../hooks/useReservations";
import { Button } from "../ui/components/shadcn-ui/button";
import { Plus } from "lucide-react";
import { NuevaInteraccionUseCase } from "../use-cases/NuevaInteraccionUseCase";

export default function InteraccionesView() {
  const { reservations, isLoading, isError } = useReservations();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Interacciones</h1>
            <p className="text-sm text-zinc-400">
              Gestiona todas las reservas e interacciones con clientes.
            </p>
          </div>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Interacción
          </Button>
        </div>

        {/* Tabla */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-zinc-300 whitespace-nowrap">
              <thead className="text-xs text-zinc-400 uppercase bg-zinc-950/50 border-b border-zinc-800">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Producto</th>
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">Vendedor</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4">Tipo Int.</th>
                  <th className="px-6 py-4">Fecha Retiro</th>
                  <th className="px-6 py-4">Canal Venta</th>
                  <th className="px-6 py-4">Descuento</th>
                  <th className="px-6 py-4">Comisión</th>
                  <th className="px-6 py-4">Observaciones</th>
                  <th className="px-6 py-4">Creado el</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={13} className="text-center py-8 text-zinc-500">
                      Cargando interacciones...
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={13} className="text-center py-8 text-red-500">
                      Ocurrió un error al cargar los datos.
                    </td>
                  </tr>
                ) : reservations.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="text-center py-8 text-zinc-500">
                      No hay interacciones registradas.
                    </td>
                  </tr>
                ) : (
                  reservations.map((res) => (
                    <tr key={res.id} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium">#{res.id}</td>
                      <td className="px-6 py-4">
                        {res.product?.name || "N/A"}
                        {res.product?.capacity ? ` ${res.product.capacity}GB` : ""}
                        {res.product?.color ? ` - ${res.product.color}` : ""}
                      </td>
                      <td className="px-6 py-4">{res.client?.nombre || "N/A"}</td>
                      <td className="px-6 py-4">{res.user?.name || "N/A"}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                          res.status.toLowerCase() === 'finalizado' ? 'bg-green-900/20 text-green-400 border-green-500/30' :
                          res.status.toLowerCase() === 'cancelado' ? 'bg-red-900/20 text-red-400 border-red-500/30' :
                          'bg-amber-900/20 text-amber-400 border-amber-500/30'
                        }`}>
                          {res.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{res.tipo_interaccion}</td>
                      <td className="px-6 py-4">
                        {res.date_retiro ? new Date(res.date_retiro).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : "No definida"}
                      </td>
                      <td className="px-6 py-4">{res.canal_venta || "-"}</td>
                      <td className="px-6 py-4">{res.descuento ? `$${res.descuento}` : "-"}</td>
                      <td className="px-6 py-4">{res.comision ? `$${res.comision}` : "-"}</td>
                      <td className="px-6 py-4 max-w-xs truncate" title={res.observations}>{res.observations || "-"}</td>
                      <td className="px-6 py-4">{new Date(res.reservedAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right sticky right-0 bg-zinc-900/80 backdrop-blur-sm">
                        <Button variant="outline" size="sm" className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700">
                          Ver Detalles
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <NuevaInteraccionUseCase 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
