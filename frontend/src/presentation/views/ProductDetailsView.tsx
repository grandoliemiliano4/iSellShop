import React from 'react';
import Link from 'next/link';
import { Product } from '../../core/domain/entities/product.entity';

interface ProductDetailsViewProps {
  product: Product | null;
  isLoading: boolean;
  error: string | null;
}

export function ProductDetailsView({ product, isLoading, error }: ProductDetailsViewProps) {
  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-black text-white">
        <h2 className="text-2xl font-bold text-red-500 mb-4">{error || 'Producto no encontrado'}</h2>
        <Link href="/" className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors">
          Volver al Inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8 text-gray-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-purple-400 transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-gray-400">{product.category}</span>
          <span>/</span>
          <span className="text-gray-200">{product.name}</span>
        </nav>

        {/* Product Details Section */}
        <div className="flex flex-col md:flex-row gap-12 bg-zinc-900/40 p-8 rounded-3xl border border-zinc-800 shadow-2xl mb-24">
          {/* Image */}
          <div className="w-full md:w-1/2 flex-shrink-0">
            <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-800 relative group">
              <img
                src={product.image?.startsWith('http') ? product.image : `http://localhost:3001${product.image}`}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-md text-sm font-semibold text-white border border-zinc-500/30">
                  {product.category}
                </span>
                <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-md text-sm font-semibold text-cyan-300 border border-cyan-500/30">
                  {product.condition || 'NUEVO'}
                </span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="text-3xl font-black text-purple-400 mb-8">
              ${product.price.toFixed(2)}
            </div>

            <div className="prose prose-invert max-w-none mb-10">
              <p className="text-gray-400 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex gap-4 mt-auto">
              <button
                onClick={() => {
                  const text = encodeURIComponent(`Hola, me interesa el producto: ${product.name} `);
                  window.open(`https://wa.me/+5493435230330?text=${text}`, '_blank');
                }}
                className="flex-1 flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:-translate-y-1 shadow-lg shadow-green-900/50"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                Contactar al Vendedor
              </button>
              <button className="px-6 py-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors border border-zinc-700 hover:border-zinc-500">
                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
