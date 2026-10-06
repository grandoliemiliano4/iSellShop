import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async login(email: string, pass: string) {

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException('Credenciales inválidas');

    // Verificar que exista y coincida su contraseña
    const payload = { email: user.email, name: user.name, role: user.role };

    return {
      message: 'Login exitoso',
      user: payload,
      token: await this.jwtService.signAsync(payload),
      role: user.role,
    };
  }
}
