import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, User, Shield, Mail, MapPin, CreditCard, Save } from "lucide-react";
import { useAuthContext } from "../../../providers/AuthTokenProvider";
import userService from "../../../../core/application/services/user.service";

interface ModalPerfilProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string | null;
  userRole: string | null;
}

export function ModalPerfil({
  isOpen,
  onClose,
  userName,
  userRole,
}: ModalPerfilProps) {
  const { userId, userEmail, userDni, userCiudad, token, updateProfileData } =
    useAuthContext();

  const [dni, setDni] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setDni(userDni || "");
      setCiudad(userCiudad || "");
      setSuccessMsg("");
      setErrorMsg("");
    }
  }, [isOpen, userDni, userCiudad]);

  if (!isOpen || !mounted) return null;

  const handleSave = async () => {
    if (!userId || !token) return;

    setIsSaving(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await userService.updateProfile(userId, { dni, ciudad }, token);
      updateProfileData(dni, ciudad);
      setSuccessMsg("Datos actualizados correctamente");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      setErrorMsg("No se pudo guardar la información");
    } finally {
      setIsSaving(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-xl shadow-2xl relative animate-in fade-in zoom-in duration-200 flex flex-col max-h-[95vh] overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors bg-white/50 backdrop-blur-sm"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row overflow-y-auto w-full flex-1 min-h-0">
          {/* Columna Izquierda: Avatar e Info Básica */}
          <div className="md:w-2/5 bg-gray-50 p-6 md:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 min-h-[200px] shrink-0">
            <div className="w-24 h-24 bg-cyan-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm mb-4 relative shrink-0">
              <User className="w-10 h-10 text-cyan-600" />
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 text-center">
              {userName || "Usuario"}
            </h2>

            <div className="flex items-center gap-1.5 text-cyan-700 bg-cyan-100/50 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-2 border border-cyan-200">
              <Shield className="w-3.5 h-3.5" />
              {userRole || "USER"}
            </div>
          </div>

          {/* Columna Derecha: Detalles y Formulario */}
          <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              Datos Personales
            </h3>

            <div className="space-y-4 w-full">
              {/* Email de solo lectura */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs text-gray-500 font-medium uppercase">
                    Email
                  </span>
                  <span className="text-sm text-gray-900 font-medium truncate">
                    {userEmail || "-"}
                  </span>
                </div>
              </div>

              {/* DNI Editable */}
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-cyan-200 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all">
                <CreditCard className="w-5 h-5 text-cyan-500 shrink-0" />
                <div className="flex flex-col w-full">
                  <label className="text-xs text-gray-500 font-medium uppercase">
                    DNI
                  </label>
                  <input
                    type="text"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    placeholder="Ingresa tu DNI"
                    className="text-sm text-gray-900 font-medium bg-transparent outline-none w-full"
                  />
                </div>
              </div>

              {/* Ciudad Editable */}
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-cyan-200 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all">
                <MapPin className="w-5 h-5 text-cyan-500 shrink-0" />
                <div className="flex flex-col w-full">
                  <label className="text-xs text-gray-500 font-medium uppercase">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    placeholder="Ej. Buenos Aires"
                    className="text-sm text-gray-900 font-medium bg-transparent outline-none w-full"
                  />
                </div>
              </div>

              {/* Mensajes de Feedback */}
              {successMsg && (
                <p className="text-sm text-green-600 font-medium">
                  {successMsg}
                </p>
              )}
              {errorMsg && (
                <p className="text-sm text-red-600 font-medium">{errorMsg}</p>
              )}

              {/* Botón de Guardar */}
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white py-2.5 rounded-xl font-medium transition-all active:scale-95 disabled:opacity-70"
              >
                <Save className="w-4 h-4" />
                {isSaving ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 px-8 py-3 flex justify-center">
          <p className="text-xs text-gray-400 font-medium text-center tracking-wide uppercase">
            iSellShop • Panel de Usuario
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
