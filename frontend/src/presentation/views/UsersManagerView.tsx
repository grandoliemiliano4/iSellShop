import React from "react";
import { User } from "../../../hooks/useUsers";
import { DataTable } from "../ui/components/DataTable";
import { ModalEditarUsuario } from "../ui/components/modals/ModalEditarUsuario";
import { ModalDelete } from "../ui/components/modals/ModalDelete";

interface UsersManagerViewProps {
  users: User[];
  isLoading: boolean;
  editingUser: User | null;
  formData: {
    name: string;
    email: string;
    role: string;
  };
  isModalOpen: boolean;
  setFormData: (data: any) => void;
  openModal: (user?: User) => void;
  closeModal: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleDelete: (user: User) => void;
  
  isSubmitting: boolean;
  isSuccess: boolean;
  isDeleteModalOpen: boolean;
  closeDeleteModal: () => void;
  userToDelete: User | null;
  confirmDelete: () => void;
  isDeleting: boolean;
  isDeleteSuccess: boolean;
  isFormDirty: boolean;
}

export function UsersManagerView({
  users,
  isLoading,
  editingUser,
  formData,
  isModalOpen,
  setFormData,
  openModal,
  closeModal,
  handleSubmit,
  handleDelete,
  isSubmitting,
  isSuccess,
  isDeleteModalOpen,
  closeDeleteModal,
  userToDelete,
  confirmDelete,
  isDeleting,
  isDeleteSuccess,
  isFormDirty,
}: UsersManagerViewProps) {
  return (
    <div className="w-full max-w-5xl mx-auto bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
        <h2 className="text-xl font-bold text-gray-200">Gestión de Usuarios</h2>
        <button
          onClick={() => openModal()}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-900/20"
        >
          + Nuevo Usuario
        </button>
      </div>

      <div className="p-4">
        <DataTable
          data={users}
          isLoading={isLoading}
          keyExtractor={(item) => item.id}
          columns={[
            {
              header: "ID",
              cell: (user) => <span className="text-gray-400">#{user.id}</span>,
            },
            {
              header: "Nombre",
              cell: (user) => (
                <span className="font-medium text-gray-200">{user.name}</span>
              ),
            },
            {
              header: "Email",
              cell: (user) => (
                <span className="text-gray-400">{user.email}</span>
              ),
            },
            {
              header: "Rol",
              cell: (user) => (
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${user.role === "admin" ? "bg-purple-900/30 text-purple-300 border border-purple-800/50" : "bg-zinc-800 text-gray-300 border border-zinc-700"}`}
                >
                  {user.role}
                </span>
              ),
            },
            {
              header: "Acciones",
              className: "text-right",
              cell: (user) => (
                <div className="space-x-3 flex justify-end">
                  <button
                    onClick={() => openModal(user)}
                    className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(user)}
                    className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              ),
            },
          ]}
        />
      </div>

      <ModalEditarUsuario
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        editingUser={editingUser}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isSuccess={isSuccess}
        isFormDirty={isFormDirty}
      />

      <ModalDelete 
        isOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        item={userToDelete}
        itemType="usuario"
        handleConfirm={confirmDelete}
        isDeleting={isDeleting}
        isSuccess={isDeleteSuccess}
      />
    </div>
  );
}
