import { Reservation, CreateReservationPayload } from '../../domain/entities/reservation.entity';
import HttpClient from '../../../infraestructure/http/httpClient';

const httpClient = new HttpClient();

class ReservationsService {
  async getReservations(): Promise<Reservation[]> {
    return httpClient.get<Reservation[]>('/reservations');
  }

  async createReservation(reservation: CreateReservationPayload): Promise<Reservation> {
    return httpClient.post<Reservation>('/reservations', reservation);
  }

  async updateReservationStatus(id: number, status: string): Promise<Reservation> {
    return httpClient.patch<Reservation>(`/reservations/${id}`, { status });
  }
}

const reservationsService = new ReservationsService();
export default reservationsService;
