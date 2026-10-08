import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '../../../core/domain/entities/product.entity';
import { Card, CardContent, CardFooter } from './shadcn-ui/card';
import { Button } from './shadcn-ui/button';
import { MessageCircle, Edit } from 'lucide-react';
import { useAuthContext } from '../../providers/AuthTokenProvider';

export function ProductCard({ product }: { product: Product }) {
  const { userRole } = useAuthContext();
  const router = useRouter();
  
  const imageUrl = product.image?.startsWith('http') 
    ? product.image 
    : `http://localhost:3001${product.image}`;

  const handleContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(`Hola, me interesa el producto: ${product.name} (ID: ${product.id}).`);
    window.open(`https://wa.me/3435230330?text=${text}`, '_blank');
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/dashboard?editProduct=${product.id}`);
  };

  return (
    <Link href={`/product/${product.id}`} className="group block h-full">
      <Card className="h-full bg-white border-gray-200 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg overflow-hidden flex flex-col relative rounded-3xl">
        <div className="w-full relative h-48 shrink-0 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
          <img
            src={imageUrl}
            alt={product.name}
            className="h-full w-auto object-contain object-center transition-transform duration-500 group-hover:scale-110"
          />
          
          <div className="absolute bottom-2 left-2 flex gap-2 z-10">
            <div className="px-2 py-1 bg-white/90 backdrop-blur-md rounded-md text-xs font-semibold text-cyan-600 border border-cyan-100 shadow-sm">
              {product.condition || 'NUEVO'}
            </div>
            
            {product.stock === 0 && (
              <div className="px-2 py-1 bg-red-50 backdrop-blur-md rounded-md text-xs font-bold text-red-600 border border-red-200 shadow-sm flex items-center">
                SIN STOCK
              </div>
            )}
          </div>
          
          {userRole === 'ADMIN' && (
            <button
              onClick={handleEdit}
              className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-md rounded-full text-gray-500 hover:text-white hover:bg-cyan-500 transition-all z-20 shadow-sm border border-gray-200"
              title="Editar producto"
            >
              <Edit className="w-4 h-4" />
            </button>
          )}
        </div>

        <CardContent className="p-5 flex-grow flex flex-col space-y-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-cyan-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px] flex-grow">
            {product.description}
          </p>
        </CardContent>

        <CardFooter className="p-5 pt-0 mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="text-xl font-extrabold text-black">
            ${Number(product.price).toFixed(2)}
          </span>
          <Button 
            onClick={handleContact}
            variant="outline" 
            className="bg-green-50 text-green-600 border-green-200 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all relative z-20 rounded-full"
            size="sm"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Contactar
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
