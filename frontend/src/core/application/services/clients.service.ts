import { Client } from '../../domain/entities/client.entity';
import HttpClient from '../../../infraestructure/http/httpClient';

const httpClient = new HttpClient();

class ClientsService {
  async getClients(): Promise<Client[]> {
    return httpClient.get<Client[]>('/clients');
  }

  async createClient(client: Omit<Client, 'id'>): Promise<Client> {
    return httpClient.post<Client>('/clients', client);
  }
}

const clientsService = new ClientsService();
export default clientsService;
