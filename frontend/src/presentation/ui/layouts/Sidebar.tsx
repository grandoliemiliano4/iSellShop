"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Home,
  Package,
  Info,
  ChevronDown,
  ChevronRight,
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Phone,
  LayoutDashboard,
  X,
} from "lucide-react";
import { cn } from "../components/shadcn-ui/lib/utils";
import { Button } from "../components/shadcn-ui/button";
import { useAuthContext } from "../../providers/AuthTokenProvider";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const { userRole } = useAuthContext();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Off-canvas menu */}
      <aside 
        className={cn(
          "fixed top-0 left-0 w-72 h-[100dvh] bg-zinc-950 border-r border-zinc-800 flex flex-col z-50 transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-cyan-400">
            iSellShop
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-800"
            asChild
            onClick={onClose}
          >
            <Link href="/">
              <Home className="mr-3 h-5 w-5" />
              Inicio
            </Link>
          </Button>

          {userRole === "ADMIN" && (
            <>
              <Button
                variant="ghost"
                className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-800"
                asChild
                onClick={onClose}
              >
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-3 h-5 w-5" />
                  Dashboard
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-800"
                asChild
                onClick={onClose}
              >
                <Link href="/interacciones">
                  <Info className="mr-3 h-5 w-5" />
                  Interacciones
                </Link>
              </Button>
            </>
          )}

          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-between text-zinc-300 hover:text-white hover:bg-zinc-800"
              onClick={() => setIsProductsOpen(!isProductsOpen)}
            >
              <div className="flex items-center">
                <Package className="mr-3 h-5 w-5" />
                Productos
              </div>
              {isProductsOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>

            {isProductsOpen && (
              <div className="pl-6 space-y-1 animate-in slide-in-from-top-1 fade-in duration-200 py-2">
                <Button variant="ghost" size="sm" className="w-full justify-start text-zinc-400 hover:text-white" asChild onClick={onClose}>
                  <Link href="/products?category=iPhone&condition=NUEVO">
                    <Smartphone className="mr-3 h-4 w-4" /> iPhone Nuevos
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-zinc-400 hover:text-white" asChild onClick={onClose}>
                  <Link href="/products?category=iPhone&condition=USADO">
                    <Smartphone className="mr-3 h-4 w-4" /> iPhone Usados
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-zinc-400 hover:text-white" asChild onClick={onClose}>
                  <Link href="/products?category=MacBook">
                    <Laptop className="mr-3 h-4 w-4" /> MacBook
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-zinc-400 hover:text-white" asChild onClick={onClose}>
                  <Link href="/products?category=iPad">
                    <Tablet className="mr-3 h-4 w-4" /> iPads
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-zinc-400 hover:text-white" asChild onClick={onClose}>
                  <Link href="/products?category=Samsung">
                    <Phone className="mr-3 h-4 w-4" /> Samsung
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-zinc-400 hover:text-white" asChild onClick={onClose}>
                  <Link href="/products?category=Accesorios">
                    <Headphones className="mr-3 h-4 w-4" /> Accesorios
                  </Link>
                </Button>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-800"
            asChild
            onClick={onClose}
          >
            <Link href="/about">
              <Info className="mr-3 h-5 w-5" />
              Acerca de nosotros
            </Link>
          </Button>
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <p className="text-xs text-zinc-500 text-center">© 2026 iSellShop</p>
        </div>
      </aside>
    </>
  );
}
