"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReservationsService = class ReservationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createReservationDto) {
        const { productId, userId, clientId, status, observations, tipo_interaccion, canal_venta, date_retiro, descuento, comision, last_modification, reservedAt, expiresAt, } = createReservationDto;
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
                    : new Date(Date.now() + 24 * 60 * 60 * 1000),
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
    findOne(id) {
        return this.prisma.reservation.findUnique({
            where: { id },
            include: {
                product: true,
                user: { select: { id: true, name: true, email: true } },
                client: true,
            },
        });
    }
    update(id, updateReservationDto) {
        const dataToUpdate = { ...updateReservationDto };
        if (updateReservationDto.date_retiro !== undefined) {
            dataToUpdate.date_retiro = updateReservationDto.date_retiro ? new Date(updateReservationDto.date_retiro) : null;
        }
        if (updateReservationDto.reservedAt !== undefined) {
            dataToUpdate.reservedAt = updateReservationDto.reservedAt ? new Date(updateReservationDto.reservedAt) : new Date();
        }
        if (updateReservationDto.last_modification !== undefined) {
            dataToUpdate.last_modification = updateReservationDto.last_modification ? new Date(updateReservationDto.last_modification) : new Date();
        }
        if (updateReservationDto.expiresAt !== undefined) {
            dataToUpdate.expiresAt = updateReservationDto.expiresAt ? new Date(updateReservationDto.expiresAt) : new Date();
        }
        return this.prisma.reservation.update({
            where: { id },
            data: dataToUpdate,
        });
    }
    remove(id) {
        return this.prisma.reservation.delete({
            where: { id },
        });
    }
};
exports.ReservationsService = ReservationsService;
exports.ReservationsService = ReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReservationsService);
//# sourceMappingURL=reservations.service.js.map