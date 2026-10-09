import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import reservationsService from "../core/application/services/reservations.service";
import { CreateReservationPayload } from "../core/domain/entities/reservation.entity";

export function useReservations() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["reservations"],
    queryFn: () => reservationsService.getReservations(),
  });

  const createMutation = useMutation({
    mutationFn: (newReservation: CreateReservationPayload) =>
      reservationsService.createReservation(newReservation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      reservationsService.updateReservationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...payload }: { id: number; [key: string]: any }) =>
      reservationsService.updateReservation(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
  });

  return {
    reservations: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    createReservation: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateStatus: updateStatusMutation.mutateAsync,
    isUpdating: updateStatusMutation.isPending,
    updateReservation: updateMutation.mutateAsync,
  };
}
