import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../presentation/providers/AuthTokenProvider';
import HttpClient from '../infraestructure/http/httpClient';

export type User = { id: number; name: string; email: string; role: string; password?: string };

const httpClient = new HttpClient();

export function useUsers() {
  const queryClient = useQueryClient();
  const { token } = useAuthContext();

  const fetchUsersFn = async () => {
    return httpClient.get<User[]>('/users');
  };

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users', token],
    queryFn: fetchUsersFn,
    enabled: !!token,
  });

  const saveMutation = useMutation({
    mutationFn: async (user: Partial<User>) => {
      const isEditing = !!user.id;
      const { id, ...userData } = user;
      
      // Prevent sending empty password on edit
      if (isEditing && !userData.password) {
        delete userData.password;
      }
      
      const body = isEditing ? userData : user;

      if (isEditing) {
        return httpClient.put<void>(`/users/${id}`, body);
      } else {
        return httpClient.post<void>('/users', body);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (err: any) => {
      alert(`Error al guardar el usuario:\n${err.message}`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return httpClient.delete<void>(`/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (err: any) => {
      alert(`Error al eliminar el usuario:\n${err.message}`);
    }
  });

  return {
    users,
    isLoading,
    saveUser: saveMutation.mutateAsync,
    deleteUser: deleteMutation.mutateAsync,
  };
}

