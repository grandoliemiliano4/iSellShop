import React from "react";
import { User } from "../../../../../hooks/useUsers";

interface ModalEditarUsuarioProps {
  isModalOpen: boolean;
  closeModal: () => void;
  editingUser: User | null;
  formData: {
    name: string;
    email: string;
    role: string;
    password?: string;
  };
  setFormData: (data: any) => void;
  isSubmitting?: boolean;
  isSuccess?: boolean;
  isFormDirty?: boolean;
}

export function ModalEditarUsuario({
  isModalOpen,
  closeModal,
  editingUser,
  formData,
  setFormData,
  handleSubmit,
  isSubmitting = false,
  isSuccess = false,
  isFormDirty = true,
}: ModalEditarUsuarioProps) {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white border border-gray-200 rounded-xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-50 text-green-600 border border-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-black">¡Éxito!</h3>
            <p className="text-gray-500">
              El usuario se ha {editingUser ? "editado" : "creado"}{" "}
              correctamente.
            </p>
            <button
              onClick={closeModal}
              className="mt-6 w-full px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-black font-medium transition-colors border border-gray-200"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-bold text-black">
                {editingUser ? "Editar Usuario" : "Nuevo Usuario"}
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-black focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-black focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Contraseña{" "}
                  {editingUser && (
                    <span className="text-gray-400 font-normal text-xs">
                      (Dejar en blanco para mantener la actual)
                    </span>
                  )}
                </label>
                <input
                  required={!editingUser}
                  minLength={6}
                  type="password"
                  placeholder={
                    editingUser ? "••••••••" : "Ingresa una contraseña"
                  }
                  value={formData.password || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-black focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Rol</label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-black focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                >
                  <option value="cliente">Cliente</option>
                  <option value="admin">Administrador</option>
                  <option value="vendedor">Vendedor</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 transition-colors font-medium disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !isFormDirty}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2 ${
                    !isFormDirty || isSubmitting
                      ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none"
                      : "bg-cyan-600 hover:bg-cyan-500 text-white"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white/70"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Guardando...
                    </>
                  ) : editingUser ? (
                    "Guardar Cambios"
                  ) : (
                    "Crear Usuario"
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
