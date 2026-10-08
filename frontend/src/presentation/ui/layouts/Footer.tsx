export default function Footer() {
  return (
    <footer className="w-full mt-auto bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-600 to-cyan-400 flex items-center justify-center font-bold text-white shadow-sm text-xs">
                iS
              </div>
              <span className="text-black font-bold tracking-wide">iSellShop</span>
            </div>
            <p className="text-gray-500 text-sm text-center md:text-left max-w-sm">
              Tu tienda de tecnología de confianza. Encuentra los mejores dispositivos y accesorios del mercado.
            </p>
          </div>

          <div className="flex gap-6 mt-4 md:mt-0 text-sm text-gray-500">
            <a href="#" className="hover:text-cyan-600 transition-colors">Términos de Servicio</a>
            <a href="#" className="hover:text-cyan-600 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-cyan-600 transition-colors">Contacto</a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-400 flex flex-col sm:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} iSellShop. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
