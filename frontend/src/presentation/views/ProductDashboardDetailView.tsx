import React from 'react';
import { Product } from '../../core/domain/entities/product.entity';
import { X, Battery } from 'lucide-react';

interface ProductDashboardDetailViewProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductDashboardDetailView({ product, onClose }: ProductDashboardDetailViewProps) {
  if (!product) return null;

  const isUsado = product.condition === 'USADO';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header Simple */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 border-b border-gray-100 px-6 py-5 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-black mb-2">{product.name}</h2>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className={`px-2 py-0.5 rounded font-medium ${isUsado ? 'bg-cyan-50 text-cyan-600 border border-cyan-100' : 'bg-gray-50 text-gray-600 border border-gray-200'}`}>
                {product.condition || 'NUEVO'}
              </span>
              {product.color && (
                <>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-600">{product.color}</span>
                </>
              )}
              {isUsado && product.usedDetail?.bateria && (
                <>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-600 flex items-center gap-1">
                    <Battery className="w-4 h-4 text-gray-400" />
                    {product.usedDetail.bateria}%
                  </span>
                </>
              )}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Texto Simple */}
        <div className="p-6 text-gray-700 text-sm space-y-2">
          <p><strong className="text-gray-500 font-medium">ID Producto:</strong> #{product.id}</p>
          <p><strong className="text-gray-500 font-medium">Precio:</strong> ${product.price.toLocaleString()}</p>
          <p><strong className="text-gray-500 font-medium">Stock:</strong> {product.stock}</p>
          <p><strong className="text-gray-500 font-medium">Capacidad:</strong> {product.capacity ? `${product.capacity}GB` : '-'}</p>
          <p><strong className="text-gray-500 font-medium">Fecha de Ingreso:</strong> {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : '-'}</p>
          <p><strong className="text-gray-500 font-medium">Categoría:</strong> {product.category || '-'}</p>
          <p><strong className="text-gray-500 font-medium">Descripción:</strong> {product.description || '-'}</p>

          {isUsado && product.usedDetail && (
            <div className="pt-4 mt-4 border-t border-gray-100 space-y-2">
              <p><strong className="text-gray-500 font-medium">IMEI:</strong> {product.usedDetail.imei || '-'}</p>
              <p><strong className="text-gray-500 font-medium">Condición de Bordes:</strong> {product.usedDetail.bordes || '-'}</p>
              <p><strong className="text-gray-500 font-medium">Garantía Hasta:</strong> {product.usedDetail.garantia_hasta ? new Date(product.usedDetail.garantia_hasta).toLocaleDateString() : '-'}</p>
              {product.usedDetail.descripcion && (
                <p><strong className="text-gray-500 font-medium">Detalle Físico:</strong> {product.usedDetail.descripcion}</p>
              )}
              
              <div className="pt-2">
                <strong className="text-gray-500 font-medium block mb-1">Funciones (✓ OK / ✗ Falla):</strong>
                <ul className="list-disc list-inside pl-1 space-y-1 text-gray-600">
                  <li>Micrófono: {product.usedDetail.microfono ? '✓' : '✗'}</li>
                  <li>Pantalla: {product.usedDetail.pantalla ? '✓' : '✗'}</li>
                  <li>Cámara Trasera: {product.usedDetail.camara_trasera ? '✓' : '✗'}</li>
                  <li>Cámara Frontal: {product.usedDetail.camara_frontal ? '✓' : '✗'}</li>
                  <li>Parlante: {product.usedDetail.parlante ? '✓' : '✗'}</li>
                  <li>Face ID: {product.usedDetail.face_id ? '✓' : '✗'}</li>
                </ul>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
