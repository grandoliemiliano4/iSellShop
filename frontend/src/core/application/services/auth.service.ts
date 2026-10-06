import { loginSchema, LoginFormValues } from '../validations/login.schema';
import { AuthMapper } from '../mappers/auth.mapper';
import { AuthResponse } from '../../domain/entities/auth.entity';
import HttpClient from '../../../infraestructure/http/httpClient';

const httpClient = new HttpClient();

class AuthService {
  async login(data: LoginFormValues): Promise<AuthResponse> {
    const validData = loginSchema.parse(data);
    const result = await httpClient.post<any>('/auth/login', validData);
    return AuthMapper.toDomain(result);
  }
}

const authService = new AuthService();
export default authService;
