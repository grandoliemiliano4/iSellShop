"use client";

import React, { useState } from "react";
import { useReservations } from "../../hooks/useReservations";
import { Button } from "../ui/components/shadcn-ui/button";
import { Plus } from "lucide-react";
import { NuevaInteraccionUseCase } from "../use-cases/NuevaInteraccionUseCase";
import { useAuthContext } from "../providers/AuthTokenProvider";

export default function InteraccionesView({
  hideHeader = false,
  filteredReservations,
}: {
  hideHeader?: boolean;
  filteredReservations?: any[];
}) {
  const {
    reservations: allReservations,
    isLoading,
    isError,
  } = useReservations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState<any>(null);
  const { userRole, userName } = useAuthContext();

  const reservations = filteredReservations || allReservations;

  return (
    <div className={`${hideHeader ? "" : "min-h-screen bg-[#FBFBFD] p-6"}`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {!hideHeader && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-black">Interacciones</h1>
              <p className="text-sm text-gray-500">
                Gestiona todas las reservas e interacciones con clientes.
              </p>
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-cyan-600 hover:bg-cyan-500 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nueva Interacción
            </Button>
          </div>
        )}

        {/* Tabla */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600 whitespace-nowrap">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
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
                    <td colSpan={13} className="text-center py-8 text-gray-500">
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
                    <td colSpan={13} className="text-center py-8 text-gray-500">
                      No hay interacciones registradas.
                    </td>
                  </tr>
                ) : (
                  reservations.map((res) => (
                    <tr
                      key={res.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-black">#{res.id}</td>
                      <td className="px-6 py-4">
                        {res.product?.name || "N/A"}
                        {res.product?.capacity
                          ? ` ${res.product.capacity}GB`
                          : ""}
                        {res.product?.color ? ` - ${res.product.color}` : ""}
                      </td>
                      <td className="px-6 py-4">
                        {res.client?.nombre || "N/A"}
                      </td>
                      <td className="px-6 py-4">{res.user?.name || "N/A"}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${
                            res.status.toLowerCase() === "finalizado"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : res.status.toLowerCase() === "cancelado"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          {res.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{res.tipo_interaccion}</td>
                      <td className="px-6 py-4">
                        {res.date_retiro
                          ? new Date(res.date_retiro).toLocaleString([], {
                              dateStyle: "short",
                              timeStyle: "short",
                            })
                          : "No definida"}
                      </td>
                      <td className="px-6 py-4">{res.canal_venta || "-"}</td>
                      <td className="px-6 py-4">
                        {res.descuento ? `$${res.descuento}` : "-"}
                      </td>
                      <td className="px-6 py-4">
                        {res.comision ? `$${res.comision}` : "-"}
                      </td>
                      <td
                        className="px-6 py-4 max-w-xs truncate"
                        title={res.observations}
                      >
                        {res.observations || "-"}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(res.reservedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right sticky right-0 bg-white/90 backdrop-blur-sm">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white border-gray-200 hover:bg-gray-100 text-gray-700"
                          >
                            Ver Detalles
                          </Button>
                          {(userRole === "ADMIN" ||
                            res.user?.name === userName) && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-cyan-50 text-cyan-600 border-cyan-200 hover:bg-cyan-100"
                              onClick={() => {
                                setEditingReservation(res);
                                setIsModalOpen(true);
                              }}
                            >
                              Editar
                            </Button>
                          )}
                        </div>
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
        onClose={() => {
          setIsModalOpen(false);
          setEditingReservation(null);
        }}
        editingReservation={editingReservation}
      />
    </div>
  );
}
