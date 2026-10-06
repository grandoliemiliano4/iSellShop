import React from 'react';

interface LoginViewProps {
  email: string;
  password: string;
  isLoading: boolean;
  error: string | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleLogin: (e: React.FormEvent) => void;
  setShowRegister: (show: boolean) => void;
}

export function LoginView({
  email,
  password,
  isLoading,
  error,
  setEmail,
  setPassword,
  handleLogin,
  setShowRegister,
}: LoginViewProps) {
  return (
    <div className="w-full max-w-md p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl transition-all duration-300 hover:border-zinc-700">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-200 mb-2 tracking-tight">Bienvenido</h1>
        <p className="text-gray-400 text-sm">Ingresa tus credenciales para continuar</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <label className={`text-sm font-medium transition-colors ${error ? 'text-red-500' : 'text-gray-400'}`} htmlFor="email">
            Correo Electrónico
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@test.com"
            className={`w-full px-4 py-3 rounded-lg bg-black border text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-1 transition-all ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-zinc-800 focus:border-zinc-600 focus:ring-zinc-600'
            }`}
          />
        </div>

        <div className="space-y-2">
          <label className={`text-sm font-medium transition-colors ${error ? 'text-red-500' : 'text-gray-400'}`} htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={`w-full px-4 py-3 rounded-lg bg-black border text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-1 transition-all ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-zinc-800 focus:border-zinc-600 focus:ring-zinc-600'
            }`}
          />
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-900/30 border border-red-800/50 text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 rounded-lg bg-zinc-700 text-gray-200 font-medium hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Conectando...' : 'Iniciar Sesión'}
        </button>
      </form>
      
      <div className="mt-6 text-center text-sm text-gray-400">
        ¿No tienes una cuenta?{' '}
        <button
          type="button"
          onClick={() => setShowRegister(true)}
          className="text-cyan-400 hover:text-cyan-300 font-semibold underline transition-colors"
        >
          Regístrate aquí
        </button>
      </div>
    </div>
  );
}
