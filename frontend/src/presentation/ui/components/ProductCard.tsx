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
      <Card className="h-full bg-zinc-900 border-zinc-800 transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] overflow-hidden flex flex-col relative">
        <div className="w-full relative h-48 shrink-0 overflow-hidden bg-zinc-800">
          <img
            src={imageUrl}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80"></div>
          
          <div className="absolute bottom-2 left-2 flex gap-2">
            <div className="px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-xs font-semibold text-cyan-300 border border-cyan-500/30">
              {product.condition || 'NUEVO'}
            </div>
            
            {product.stock === 0 && (
              <div className="px-2 py-1 bg-red-950/80 backdrop-blur-md rounded-md text-xs font-bold text-red-400 border border-red-500/50 flex items-center">
                SIN STOCK
              </div>
            )}
          </div>
          
          {userRole === 'ADMIN' && (
            <button
              onClick={handleEdit}
              className="absolute top-2 right-2 p-2 bg-black/60 backdrop-blur-md rounded-full text-gray-300 hover:text-white hover:bg-purple-600/80 transition-all z-20 shadow-lg border border-white/10"
              title="Editar producto"
            >
              <Edit className="w-4 h-4" />
            </button>
          )}
        </div>

        <CardContent className="p-5 flex-grow flex flex-col space-y-2">
          <h3 className="text-lg font-bold text-gray-100 line-clamp-1 group-hover:text-purple-300 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2 min-h-[40px] flex-grow">
            {product.description}
          </p>
        </CardContent>

        <CardFooter className="p-5 pt-0 mt-auto flex items-center justify-between border-t border-zinc-800/50">
          <span className="text-xl font-extrabold text-white">
            ${Number(product.price).toFixed(2)}
          </span>
          <Button 
            onClick={handleContact}
            variant="outline" 
            className="bg-green-600/10 text-green-400 border-green-500/30 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all relative z-20"
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
