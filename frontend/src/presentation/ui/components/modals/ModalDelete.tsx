import React from "react";

interface ModalDeleteProps {
  isOpen: boolean;
  closeModal: () => void;
  item: { name: string } | null;
  handleConfirm: () => void;
  isDeleting: boolean;
  isSuccess: boolean;
  itemType?: string;
}

export function ModalDelete({
  isOpen,
  closeModal,
  item,
  handleConfirm,
  isDeleting,
  isSuccess,
  itemType = "elemento",
}: ModalDeleteProps) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white border border-gray-200 rounded-xl w-full max-w-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
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
            <h3 className="text-xl font-bold text-black">¡Eliminado!</h3>
            <p className="text-gray-500">
              El {itemType} se ha eliminado correctamente.
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
                Confirmar Eliminación
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-700">
                ¿Estás seguro que deseas eliminar el {itemType}{" "}
                <span className="font-semibold text-black">"{item.name}"</span>?
              </p>
              <p className="text-sm text-gray-500">
                Esta acción no se puede deshacer.
              </p>
            </div>
            <div className="p-6 pt-0 flex justify-end gap-3 bg-white">
              <button
                type="button"
                onClick={closeModal}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 transition-colors font-medium disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
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
                    Eliminando...
                  </>
                ) : (
                  "Eliminar"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
