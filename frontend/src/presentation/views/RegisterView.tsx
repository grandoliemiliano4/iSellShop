import React from 'react';
import { RegisterFormValues } from '../../core/application/validations/register.schema';

interface RegisterViewProps {
  formData: RegisterFormValues;
  captchaCompleted: boolean;
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string;
  fieldErrors: Partial<Record<keyof RegisterFormValues, string>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setCaptchaCompleted: (completed: boolean) => void;
  setShowRegister: (show: boolean) => void;
}

export function RegisterView({
  formData,
  captchaCompleted,
  status,
  errorMessage,
  fieldErrors,
  handleChange,
  handleSubmit,
  setCaptchaCompleted,
  setShowRegister,
}: RegisterViewProps) {

  return (
    <div className="w-full max-w-md p-8 rounded-3xl bg-white border border-gray-200 shadow-xl transition-all duration-300 hover:border-cyan-500/30">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-black mb-2 tracking-tight">Crear Cuenta</h1>
        <p className="text-gray-500 text-sm">Regístrate para acceder a todas las funciones</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className={`text-sm font-medium transition-colors ${fieldErrors.name ? 'text-red-500' : 'text-gray-700'}`} htmlFor="name">
            Nombre Completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej. Juan Pérez"
            className={`w-full px-4 py-3 rounded-xl bg-gray-50 border text-black placeholder-gray-400 focus:outline-none focus:ring-1 transition-all ${
              fieldErrors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-cyan-500 focus:ring-cyan-500'
            }`}
          />
          {fieldErrors.name && <p className="text-xs text-red-500 mt-1">{fieldErrors.name}</p>}
        </div>

        <div className="space-y-2">
          <label className={`text-sm font-medium transition-colors ${fieldErrors.email ? 'text-red-500' : 'text-gray-700'}`} htmlFor="email">
            Correo Electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tucorreo@ejemplo.com"
            className={`w-full px-4 py-3 rounded-xl bg-gray-50 border text-black placeholder-gray-400 focus:outline-none focus:ring-1 transition-all ${
              fieldErrors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-cyan-500 focus:ring-cyan-500'
            }`}
          />
          {fieldErrors.email && <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>}
        </div>

        <div className="space-y-2">
          <label className={`text-sm font-medium transition-colors ${fieldErrors.password ? 'text-red-500' : 'text-gray-700'}`} htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mínimo 6 caracteres"
            className={`w-full px-4 py-3 rounded-xl bg-gray-50 border text-black placeholder-gray-400 focus:outline-none focus:ring-1 transition-all ${
              fieldErrors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-cyan-500 focus:ring-cyan-500'
            }`}
          />
          {fieldErrors.password && <p className="text-xs text-red-500 mt-1">{fieldErrors.password}</p>}
        </div>

        <div className="space-y-2">
          <label className={`text-sm font-medium transition-colors ${fieldErrors.confirmPassword ? 'text-red-500' : 'text-gray-700'}`} htmlFor="confirmPassword">
            Confirmar Contraseña
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Repite tu contraseña"
            className={`w-full px-4 py-3 rounded-xl bg-gray-50 border text-black placeholder-gray-400 focus:outline-none focus:ring-1 transition-all ${
              fieldErrors.confirmPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-cyan-500 focus:ring-cyan-500'
            }`}
          />
          {fieldErrors.confirmPassword && <p className="text-xs text-red-500 mt-1">{fieldErrors.confirmPassword}</p>}
        </div>

        {/* Captcha */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200 transition-all">
          <input
            type="checkbox"
            id="captcha"
            checked={captchaCompleted}
            onChange={(e) => setCaptchaCompleted(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 bg-white accent-cyan-600 cursor-pointer"
          />
          <label htmlFor="captcha" className="text-gray-700 font-medium select-none cursor-pointer flex-1">
            No soy un robot
          </label>
          <div className="flex flex-col items-center justify-center">
            <svg className="w-8 h-8 text-blue-500 opacity-80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            <span className="text-[10px] text-gray-400">reCAPTCHA</span>
          </div>
        </div>

        {status === 'error' && errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm text-center">
            {errorMessage}
          </div>
        )}

        {status === 'success' && (
          <div className="p-3 rounded-xl bg-green-50 border border-green-100 text-green-600 text-sm text-center">
            ¡Cuenta creada con éxito! Puedes iniciar sesión ahora.
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-3 px-4 rounded-xl bg-cyan-600 text-white font-medium hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {status === 'loading' ? 'Creando cuenta...' : 'Registrarse'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        ¿Ya tienes una cuenta?{' '}
        <button
          type="button"
          onClick={() => setShowRegister(false)}
          className="text-cyan-600 hover:text-cyan-500 font-semibold underline transition-colors"
        >
          Inicia Sesión aquí
        </button>
      </div>
    </div>
  );
}
