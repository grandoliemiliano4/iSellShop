"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductSearch from "../components/ProductSearch";
import { useAuthContext } from "../../providers/AuthTokenProvider";
import { Menu, ChevronDown, Package, Smartphone, Laptop, Tablet, Headphones, Phone } from "lucide-react";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const router = useRouter();

  const { isAuthenticated, userName, userRole, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="w-full bg-black/90 backdrop-blur-md border-b border-zinc-800 p-4 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        {/* Left Side: Logo & Hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="p-2 text-zinc-400 hover:text-white transition-colors lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <Link href="/" className="flex items-center">
            <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-cyan-400">
              iSellShop
            </h2>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            Inicio
          </Link>
          {userRole === "ADMIN" && (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/interacciones" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
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
            <Link href="/products" className="flex items-center gap-1 text-sm font-medium text-zinc-300 hover:text-white transition-colors py-2">
              Productos
              <ChevronDown className={`w-4 h-4 transition-transform ${isProductsDropdownOpen ? 'rotate-180' : ''}`} />
            </Link>

            {isProductsDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl py-2 animate-in fade-in zoom-in-95 duration-200">
                <Link href="/products?category=iPhone&condition=NUEVO" className="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                  <Smartphone className="w-4 h-4 mr-3 text-zinc-400" /> iPhone Nuevos
                </Link>
                <Link href="/products?category=iPhone&condition=USADO" className="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                  <Smartphone className="w-4 h-4 mr-3 text-zinc-400" /> iPhone Usados
                </Link>
                <Link href="/products?category=MacBook" className="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                  <Laptop className="w-4 h-4 mr-3 text-zinc-400" /> MacBook
                </Link>
                <Link href="/products?category=iPad" className="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                  <Tablet className="w-4 h-4 mr-3 text-zinc-400" /> iPads
                </Link>
                <Link href="/products?category=Samsung" className="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 mr-3 text-zinc-400" /> Samsung
                </Link>
                <Link href="/products?category=Accesorios" className="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                  <Headphones className="w-4 h-4 mr-3 text-zinc-400" /> Accesorios
                </Link>
              </div>
            )}
          </div>

          <Link href="/about" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            Acerca de nosotros
          </Link>
        </nav>

        {/* Right Side: Search & Auth */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-800"
            aria-label="Buscar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <div className="h-6 w-px bg-zinc-800 mx-1 hidden sm:block"></div>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-sm font-bold text-white shadow-md">
                  {userName ? userName.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="text-sm font-medium text-zinc-200 hidden sm:block">
                  {userName || "Usuario"}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs font-medium text-zinc-400 hover:text-red-400 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-indigo-600/10 text-indigo-400 text-sm font-medium hover:bg-indigo-600 hover:text-white border border-indigo-500/30 transition-all shadow-[0_0_15px_rgba(79,70,229,0.1)] hover:shadow-[0_0_20px_rgba(79,70,229,0.3)]"
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
    </header>
  );
}
