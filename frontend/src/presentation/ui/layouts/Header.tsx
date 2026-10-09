"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ProductSearch from "../components/ProductSearch";
import { useAuthContext } from "../../providers/AuthTokenProvider";
import { Menu, ChevronDown, Package, Smartphone, Laptop, Tablet, Headphones, Phone } from "lucide-react";
import { ModalPerfil } from "../components/modals/ModalPerfil";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  const { isAuthenticated, userName, userRole, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-gray-200 p-4 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        {/* Left Side: Logo & Hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="p-2 text-gray-500 hover:text-black transition-colors lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.jpg" 
              alt="iSellShop Logo" 
              width={140} 
              height={40} 
              className="object-contain h-10 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-cyan-500 transition-colors">
            Inicio
          </Link>
          {userRole === "ADMIN" && (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-cyan-500 transition-colors">
                Dashboard
              </Link>
              <Link href="/interacciones" className="text-sm font-medium text-gray-600 hover:text-cyan-500 transition-colors">
                Interacciones
              </Link>
            </>
          )}

          {/* Products Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsProductsDropdownOpen(true)}
            onMouseLeave={() => setIsProductsDropdownOpen(false)}
          >
            <Link href="/products" className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-cyan-500 transition-colors py-2">
              Productos
              <ChevronDown className={`w-4 h-4 transition-transform ${isProductsDropdownOpen ? 'rotate-180' : ''}`} />
            </Link>

            {isProductsDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-56 bg-white border border-gray-100 rounded-xl shadow-xl py-2 animate-in fade-in zoom-in-95 duration-200">
                <Link href="/products?category=iPhone&condition=NUEVO" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-cyan-500 transition-colors">
                  <Smartphone className="w-4 h-4 mr-3 text-gray-400" /> iPhone Nuevos
                </Link>
                <Link href="/products?category=iPhone&condition=USADO" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-cyan-500 transition-colors">
                  <Smartphone className="w-4 h-4 mr-3 text-gray-400" /> iPhone Usados
                </Link>
                <Link href="/products?category=MacBook" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-cyan-500 transition-colors">
                  <Laptop className="w-4 h-4 mr-3 text-gray-400" /> MacBook
                </Link>
                <Link href="/products?category=iPad" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-cyan-500 transition-colors">
                  <Tablet className="w-4 h-4 mr-3 text-gray-400" /> iPads
                </Link>
                <Link href="/products?category=Samsung" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-cyan-500 transition-colors">
                  <Phone className="w-4 h-4 mr-3 text-gray-400" /> Samsung
                </Link>
                <Link href="/products?category=Accesorios" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-cyan-500 transition-colors">
                  <Headphones className="w-4 h-4 mr-3 text-gray-400" /> Accesorios
                </Link>
              </div>
            )}
          </div>

          <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-cyan-500 transition-colors">
            Acerca de nosotros
          </Link>
        </nav>

        {/* Right Side: Search & Auth */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-gray-500 hover:text-cyan-500 transition-colors rounded-full hover:bg-gray-100"
            aria-label="Buscar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block"></div>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-sm font-bold text-white shadow-md">
                  {userName ? userName.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {userName || "Usuario"}
                </span>
              </button>
              <button
                onClick={handleLogout}
                className="text-xs font-medium text-gray-400 hover:text-red-500 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-cyan-50 text-cyan-600 text-sm font-medium hover:bg-cyan-500 hover:text-white border border-cyan-200 transition-all shadow-sm hover:shadow-cyan-500/20"
            >
              Ingresar
            </Link>
          )}
        </div>
      </div>

      <ProductSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <ModalPerfil
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userName={userName}
        userRole={userRole}
      />
    </header>
  );
}
