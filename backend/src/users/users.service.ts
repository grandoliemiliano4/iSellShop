import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    // 1. Encriptar la contraseña (salt = 10 vueltas)
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // 2. Guardar en la BD reemplazando el texto plano por el hash
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const dataToUpdate = { ...updateUserDto };
      if (dataToUpdate.password) {
        dataToUpdate.password = await bcrypt.hash(dataToUpdate.password, 10);
      }
      return await this.prisma.user.update({
        where: { id },
        data: dataToUpdate,
      });
    } catch (error) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.user.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }
}
