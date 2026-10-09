"use client";

import { useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import { UsersManagerView } from "../views/UsersManagerView";

export function UsersManagerUseCase() {
  const { users, isLoading, saveUser, deleteUser } = useUsers();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  const openModal = (user?: User) => {
    setIsSuccess(false);
    if (user) {
      setEditingUser(user);
      setFormData({ name: user.name, email: user.email, role: user.role, password: "" });
    } else {
      setEditingUser(null);
      setFormData({ name: "", email: "", role: "user", password: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setIsSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await saveUser({ ...formData, id: editingUser?.id });
      setIsSuccess(true);
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (err) {
      // Error handled in hook
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteModal = (user: User) => {
    setIsDeleteSuccess(false);
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
    setIsDeleteSuccess(false);
  };

  const confirmDelete = async () => {
    if (!userToDelete?.id) return;
    setIsDeleting(true);
    try {
      await deleteUser(userToDelete.id);
      setIsDeleteSuccess(true);
      setTimeout(() => {
        closeDeleteModal();
      }, 2000);
    } catch (error) {
      // Error handled in hook
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <UsersManagerView
      users={users}
      isLoading={isLoading}
      editingUser={editingUser}
      formData={formData}
      isModalOpen={isModalOpen}
      setFormData={setFormData}
      openModal={openModal}
      closeModal={closeModal}
      handleSubmit={handleSubmit}
      handleDelete={openDeleteModal}
      
      isSubmitting={isSubmitting}
      isSuccess={isSuccess}
      
      isDeleteModalOpen={isDeleteModalOpen}
      closeDeleteModal={closeDeleteModal}
      userToDelete={userToDelete}
      confirmDelete={confirmDelete}
      isDeleting={isDeleting}
      isDeleteSuccess={isDeleteSuccess}
      
      isFormDirty={
        !editingUser ||
        formData.name !== editingUser.name ||
        formData.email !== editingUser.email ||
        formData.role !== editingUser.role ||
        formData.password !== ""
      }
    />
  );
}
