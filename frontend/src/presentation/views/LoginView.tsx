import React from "react";

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
    <div className="w-full max-w-md p-8 rounded-3xl bg-white border border-gray-200 shadow-xl transition-all duration-300 hover:border-cyan-500/30">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-black mb-2 tracking-tight">
          Bienvenido
        </h1>
        <p className="text-gray-500 text-sm">
          Ingresa tus credenciales para continuar
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <label
            className={`text-sm font-medium transition-colors ${error ? "text-red-500" : "text-gray-700"}`}
            htmlFor="email"
          >
            Correo Electrónico
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className={`w-full px-4 py-3 rounded-xl bg-gray-50 border text-black placeholder-gray-400 focus:outline-none focus:ring-1 transition-all ${
              error
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-cyan-500 focus:ring-cyan-500"
            }`}
          />
        </div>

        <div className="space-y-2">
          <label
            className={`text-sm font-medium transition-colors ${error ? "text-red-500" : "text-gray-700"}`}
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={`w-full px-4 py-3 rounded-xl bg-gray-50 border text-black placeholder-gray-400 focus:outline-none focus:ring-1 transition-all ${
              error
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-cyan-500 focus:ring-cyan-500"
            }`}
          />
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 rounded-xl bg-cyan-600 text-white font-medium hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {isLoading ? "Conectando..." : "Iniciar Sesión"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        ¿No tienes una cuenta?{" "}
        <button
          type="button"
          onClick={() => setShowRegister(true)}
          className="text-cyan-600 hover:text-cyan-500 font-semibold underline transition-colors"
        >
          Regístrate aquí
        </button>
      </div>
    </div>
  );
}
