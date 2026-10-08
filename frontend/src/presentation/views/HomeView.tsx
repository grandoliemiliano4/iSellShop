"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/components/shadcn-ui/button";
import { ArrowRight, Zap, Shield, Smartphone } from "lucide-react";

const slides = [
  {
    image: "/images/home-bg-1.jpg",

    subtitle: "Diseñado en aluminio ultra resistente.",
  },
  {
    image: "/images/home-bg-2.jpg",

    subtitle: "Cámara Fusion principal de 48 MP con apertura variable.",
  },
  {
    image: "/images/home-bg-3.jpg",

    subtitle: "Potencia desbordante con el chip A19 Pro para cualquier tarea.",
  },
];

export function HomeView() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 bg-white text-black selection:bg-cyan-500/30">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/50 via-white/80 to-white z-0"></div>

        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-80" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "multiply",
            }}
          ></div>
        ))}

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-32 h-[800px] flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-black via-gray-700 to-gray-500 pb-2 my-18">
            Llega el nuevo 18 Pro.
          </h1>

          <div className="relative w-full h-[60px] flex items-center justify-center mt-20">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute w-full transition-all duration-1000 ease-in-out ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <p className="text-lg md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
                  {slide.subtitle}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button
              asChild
              size="lg"
              className="h-12 px-8 text-base bg-black text-white hover:bg-gray-800 hover:scale-105 transition-all"
            >
              <Link href="/products">
                Ver Catálogo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="flex gap-2 mt-12">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "w-8 bg-black" : "w-2 bg-gray-300"
                }`}
                aria-label={`Ir a la diapositiva ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Por qué elegir iSellShop
            </h2>
            <p className="text-gray-500">
              La mejor experiencia de compra para tus dispositivos Apple.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-cyan-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">
                Última Tecnología
              </h3>
              <p className="text-gray-500">
                Equipos de última generación con los chips de la serie M y A
                Bionic más potentes.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-cyan-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">
                Garantía Asegurada
              </h3>
              <p className="text-gray-500">
                Todos nuestros equipos nuevos y usados cuentan con garantía
                extendida.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-cyan-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">
                Variedad de Stock
              </h3>
              <p className="text-gray-500">
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
