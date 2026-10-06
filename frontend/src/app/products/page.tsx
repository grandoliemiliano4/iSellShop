import CatalogView from '../../presentation/views/CatalogView';
import { Suspense } from 'react';

export default function ProductsRoute() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center text-white">Cargando catálogo...</div>}>
      <CatalogView />
    </Suspense>
  );
}
