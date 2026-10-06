'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProductsManagerUseCase } from '../../presentation/use-cases/ProductsManagerUseCase';
import { UsersManagerUseCase } from '../../presentation/use-cases/UsersManagerUseCase';
import { useAuthContext } from '../../presentation/providers/AuthTokenProvider';

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'users' | 'products'>('products');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { userRole, isAuthenticated } = useAuthContext();

  useEffect(() => {
    // Only check once auth state is resolved or we know it from the token
    if (userRole !== 'ADMIN') {
      router.push('/');
    } else {
      setIsAuthorized(true);
    }
  }, [router, userRole]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-black text-gray-300">
      <main className="flex-grow p-4 md:p-8">
        
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex space-x-4 border-b border-zinc-800 pb-2">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                activeTab === 'products' 
                  ? 'bg-zinc-800 text-purple-400 border-b-2 border-purple-500' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Productos
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                activeTab === 'users' 
                  ? 'bg-zinc-800 text-purple-400 border-b-2 border-purple-500' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Usuarios
            </button>
          </div>
        </div>

        {activeTab === 'products' ? <ProductsManagerUseCase /> : <UsersManagerUseCase />}

      </main>
    </div>
  );
}
