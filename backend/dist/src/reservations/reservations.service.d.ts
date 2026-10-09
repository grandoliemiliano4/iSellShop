import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class ReservationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createReservationDto: CreateReservationDto): import("@prisma/client").Prisma.Prisma__ReservationClient<{
        id: number;
        status: string;
        productId: number;
        userId: number;
        clientId: number;
        observations: string | null;
        tipo_interaccion: string;
        canal_venta: string | null;
        date_retiro: Date | null;
        descuento: number | null;
        comision: number | null;
        total: number | null;
        last_modification: Date;
        reservedAt: Date;
        expiresAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        user: {
            id: number;
            email: string;
            name: string;
        };
        product: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            price: number;
            image: string;
            category: string;
            condition: string;
            stock: number;
            capacity: string | null;
            color: string | null;
        };
        client: {
            id: number;
            dni: string | null;
            ciudad: string | null;
            createdAt: Date;
            updatedAt: Date;
            nombre: string;
            tel: string | null;
            sexo: string | null;
        };
    } & {
        id: number;
        status: string;
        productId: number;
        userId: number;
        clientId: number;
        observations: string | null;
        tipo_interaccion: string;
        canal_venta: string | null;
        date_retiro: Date | null;
        descuento: number | null;
        comision: number | null;
        total: number | null;
        last_modification: Date;
        reservedAt: Date;
        expiresAt: Date;
    })[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__ReservationClient<({
        user: {
            id: number;
            email: string;
            name: string;
        };
        product: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            price: number;
            image: string;
            category: string;
            condition: string;
            stock: number;
            capacity: string | null;
            color: string | null;
        };
        client: {
            id: number;
            dni: string | null;
            ciudad: string | null;
            createdAt: Date;
            updatedAt: Date;
            nombre: string;
            tel: string | null;
            sexo: string | null;
        };
    } & {
        id: number;
        status: string;
        productId: number;
        userId: number;
        clientId: number;
        observations: string | null;
        tipo_interaccion: string;
        canal_venta: string | null;
        date_retiro: Date | null;
        descuento: number | null;
        comision: number | null;
        total: number | null;
        last_modification: Date;
        reservedAt: Date;
        expiresAt: Date;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateReservationDto: UpdateReservationDto): import("@prisma/client").Prisma.Prisma__ReservationClient<{
        id: number;
        status: string;
        productId: number;
        userId: number;
        clientId: number;
        observations: string | null;
        tipo_interaccion: string;
        canal_venta: string | null;
        date_retiro: Date | null;
        descuento: number | null;
        comision: number | null;
        total: number | null;
        last_modification: Date;
        reservedAt: Date;
        expiresAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__ReservationClient<{
        id: number;
        status: string;
        productId: number;
        userId: number;
        clientId: number;
        observations: string | null;
        tipo_interaccion: string;
        canal_venta: string | null;
        date_retiro: Date | null;
        descuento: number | null;
        comision: number | null;
        total: number | null;
        last_modification: Date;
        reservedAt: Date;
        expiresAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
