import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import clientsService from '../core/application/services/clients.service';
import { Client } from '../core/domain/entities/client.entity';

export function useClients() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['clients'],
    queryFn: () => clientsService.getClients(),
  });

  const createMutation = useMutation({
    mutationFn: (newClient: Omit<Client, 'id'>) => clientsService.createClient(newClient),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });

  return {
    clients: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    createClient: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
  };
}
