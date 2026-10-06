import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  create(createReservationDto: CreateReservationDto) {
    const {
      productId,
      userId,
      clientId,
      status,
      observations,
      tipo_interaccion,
      canal_venta,
      date_retiro,
      descuento,
      comision,
      last_modification,
      reservedAt,
      expiresAt,
    } = createReservationDto;
    return this.prisma.reservation.create({
      data: {
        productId,
        userId,
        clientId,
        status: status || 'Pendiente',
        observations,
        tipo_interaccion: tipo_interaccion || 'Personal',
        canal_venta,
        descuento,
        comision,
        date_retiro: date_retiro ? new Date(date_retiro) : null,
        reservedAt: reservedAt ? new Date(reservedAt) : new Date(),
        last_modification: last_modification
          ? new Date(last_modification)
          : new Date(),
        expiresAt: expiresAt
          ? new Date(expiresAt)
          : new Date(Date.now() + 24 * 60 * 60 * 1000), // Default 24h
      },
    });
  }

  findAll() {
    return this.prisma.reservation.findMany({
      include: {
        product: true,
        user: { select: { id: true, name: true, email: true } },
        client: true,
      },
      orderBy: { reservedAt: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prisma.reservation.findUnique({
      where: { id },
      include: {
        product: true,
        user: { select: { id: true, name: true, email: true } },
        client: true,
      },
    });
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.prisma.reservation.update({
      where: { id },
      data: updateReservationDto,
    });
  }

  remove(id: number) {
    return this.prisma.reservation.delete({
      where: { id },
    });
  }
}
