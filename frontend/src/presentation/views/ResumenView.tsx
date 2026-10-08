import React, { useMemo, useState } from 'react';
import { useReservations } from '../../hooks/useReservations';
import { useAuthContext } from '../providers/AuthTokenProvider';
import InteraccionesView from './InteraccionesView';
import { TrendingUp, Users, Package, DollarSign, Calendar } from 'lucide-react';

export default function ResumenView() {
  const { reservations, isLoading } = useReservations();
  const { userRole, userName } = useAuthContext();
  
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // Filter reservations based on role and month
  const visibleReservations = useMemo(() => {
    return reservations.filter(r => {
      // 1. Filter by user: both Vendedor and Admin see their own interactions in the summary
      // (If you want Admin to see all by default, we could add a toggle, but instructions say "sus propias interacciones")
      const isOwner = r.user?.name === userName;
      
      // 2. Filter by month
      const resDate = new Date(r.reservedAt);
      const resMonth = resDate.toISOString().slice(0, 7);
      const matchesMonth = resMonth === selectedMonth;

      return isOwner && matchesMonth;
    });
  }, [reservations, userName, selectedMonth]);

  // Compute stats
  const stats = useMemo(() => {
    let totalSales = 0; // sum of (price - discount) for Finalizado
    let pendingCount = 0;
    let completedCount = 0;
    let totalComision = 0;

    visibleReservations.forEach(res => {
      if (res.status === 'Finalizado') {
        completedCount++;
        // Calculate sale total
        const pPrice = res.product?.price || 0;
        const discount = res.descuento || 0;
        totalSales += (pPrice - discount);

        if (res.comision) {
          totalComision += res.comision;
        }
      } else if (res.status === 'Pendiente' || res.status === 'Reservó') {
        pendingCount++;
      }
    });

    return { totalSales, pendingCount, completedCount, totalComision };
  }, [visibleReservations]);

  if (isLoading) {
    return <div className="text-gray-500">Cargando resumen...</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-black">Mi Resumen</h2>
          <p className="text-sm text-gray-500">Histórico de tus interacciones y estadísticas.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-black shadow-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          <input 
            type="month" 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-transparent border-none outline-none text-sm [color-scheme:light]"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 relative overflow-hidden group shadow-sm">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp className="w-16 h-16 text-purple-500" />
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1">Ventas Totales</p>
          <h3 className="text-3xl font-bold text-black">${stats.totalSales.toLocaleString()}</h3>
          <p className="text-xs text-gray-400 mt-2">Equipos en estado "Finalizado"</p>
        </div>

        {/* Completed Interactions */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 relative overflow-hidden group shadow-sm">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Package className="w-16 h-16 text-cyan-500" />
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1">Ventas Concretadas</p>
          <h3 className="text-3xl font-bold text-black">{stats.completedCount}</h3>
          <p className="text-xs text-gray-400 mt-2">Interacciones finalizadas</p>
        </div>

        {/* Pending Interactions */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 relative overflow-hidden group shadow-sm">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users className="w-16 h-16 text-amber-500" />
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1">En Seguimiento</p>
          <h3 className="text-3xl font-bold text-black">{stats.pendingCount}</h3>
          <p className="text-xs text-gray-400 mt-2">Reservas y consultas pendientes</p>
        </div>

        {/* Total Commission - Only visible if admin or if they have commissions to see */}
        {userRole === 'ADMIN' && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <DollarSign className="w-16 h-16 text-green-500" />
            </div>
            <p className="text-gray-500 text-sm font-medium mb-1">Comisiones Generadas</p>
            <h3 className="text-3xl font-bold text-black">${stats.totalComision.toLocaleString()}</h3>
            <p className="text-xs text-gray-400 mt-2">Suma de todas las comisiones</p>
          </div>
        )}
      </div>

      <div className="mt-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold text-black mb-6">Detalle de Interacciones</h2>
        <div className="-m-6">
          <InteraccionesView hideHeader={true} filteredReservations={visibleReservations} />
        </div>
      </div>
    </div>
  );
}
