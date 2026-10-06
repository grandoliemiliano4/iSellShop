import { AuthResponse } from '../../domain/entities/auth.entity';

export class AuthMapper {
  static toDomain(apiResponse: any): AuthResponse {
    return {
      message: apiResponse.message,
      user: {
        email: apiResponse.user.email,
        name: apiResponse.user.name,
        role: apiResponse.user.role,
      },
      token: apiResponse.token,
    };
  }
}
