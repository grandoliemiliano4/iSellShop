"use client";

import React from 'react';
import { Shield, Zap, Target, Users, MapPin, Mail, Phone } from 'lucide-react';

export default function AboutView() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-24 sm:py-32 bg-gray-50">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-gray-500/5 to-white pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
            Sobre Nosotros
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Somos apasionados por la tecnología. Nuestro objetivo es acercarte los mejores dispositivos, con la mejor atención y garantía del mercado.
          </p>
        </div>
      </div>

      {/* Valores / Misión */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Valor 1 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-cyan-500/30 transition-all group shadow-sm">
            <div className="w-14 h-14 bg-cyan-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-100 transition-colors">
              <Shield className="w-7 h-7 text-cyan-600" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-4">Calidad Asegurada</h3>
            <p className="text-gray-600 leading-relaxed">
              Todos nuestros equipos, tanto nuevos como usados, pasan por rigurosos controles de calidad. Ofrecemos garantías transparentes para tu tranquilidad.
            </p>
          </div>

          {/* Valor 2 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-blue-500/30 transition-all group shadow-sm">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
              <Zap className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-4">Rapidez y Eficiencia</h3>
            <p className="text-gray-600 leading-relaxed">
              Sabemos que tu tiempo vale. Optimizamos nuestros procesos para que tu experiencia de compra sea rápida, segura y sin complicaciones.
            </p>
          </div>

          {/* Valor 3 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-indigo-500/30 transition-all group shadow-sm">
            <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-colors">
              <Target className="w-7 h-7 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-4">Enfoque al Cliente</h3>
            <p className="text-gray-600 leading-relaxed">
              Nuestro soporte está siempre dispuesto a asesorarte. Nos importa que encuentres el equipo que realmente se adapte a tus necesidades.
            </p>
          </div>
        </div>
      </div>

      {/* Historia o Misión */}
      <div className="bg-gray-50 py-24 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-black">Nuestra Historia</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Nacimos con la idea de revolucionar la forma en que las personas compran tecnología. Empezamos en un pequeño local, reparando equipos y vendiendo accesorios básicos.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Hoy en día, nos enorgullece ser un referente en la venta de dispositivos de alta gama. Nuestro compromiso sigue siendo el mismo: ofrecer tecnología accesible sin sacrificar la excelencia y el servicio premium.
              </p>
            </div>
            <div className="flex-1 w-full relative">
              <div className="aspect-video rounded-2xl bg-gray-200 border border-gray-300 flex items-center justify-center relative overflow-hidden shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent"></div>
                <Users className="w-32 h-32 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contacto Rapido */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl font-bold text-black mb-12">¿Dónde Encontrarnos?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center">
              <MapPin className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <p className="font-medium text-black">Ubicación</p>
              <p className="text-sm text-gray-600 mt-1">Av. Falsa 123, Ciudad</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center">
              <Phone className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <p className="font-medium text-black">Teléfono</p>
              <p className="text-sm text-gray-600 mt-1">+1 234 567 8900</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center">
              <Mail className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <p className="font-medium text-black">Email</p>
              <p className="text-sm text-gray-600 mt-1">contacto@isellshop.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
