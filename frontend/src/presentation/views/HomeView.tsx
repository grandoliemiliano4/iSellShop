import React from "react";
import Link from "next/link";
import { Button } from "../ui/components/shadcn-ui/button";
import { ArrowRight, Zap, Shield, Smartphone } from "lucide-react";

export function HomeView() {
  return (
    <div className="flex-1 bg-black text-white selection:bg-purple-500/30">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-purple-300 backdrop-blur-md mb-4">
            <span className="flex h-2 w-2 rounded-full bg-purple-500 mr-2 animate-pulse"></span>
            Nuevos modelos ya disponibles
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            El futuro de la tecnología, <br />
            en tus manos.
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Descubre los últimos lanzamientos de Apple. Diseños revolucionarios,
            chips ultrarrápidos y cámaras de nivel profesional.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="h-12 px-8 text-base bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all"
            >
              <Link href="/products">
                Ver Catálogo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 px-4 bg-zinc-950 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Por qué elegir iSellShop
            </h2>
            <p className="text-gray-400">
              La mejor experiencia de compra para tus dispositivos Apple.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-purple-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Última Tecnología</h3>
              <p className="text-gray-400">
                Equipos de última generación con los chips de la serie M y A
                Bionic más potentes.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-blue-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Garantía Asegurada</h3>
              <p className="text-gray-400">
                Todos nuestros equipos nuevos y usados cuentan con garantía
                extendida.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-cyan-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Variedad de Stock</h3>
              <p className="text-gray-400">
                Desde iPhones hasta MacBooks, contamos con stock inmediato para
                entrega.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
