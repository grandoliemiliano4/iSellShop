import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class ClientsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createClientDto: CreateClientDto): import("@prisma/client").Prisma.Prisma__ClientClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nombre: string;
        tel: string | null;
        ciudad: string | null;
        dni: string | null;
        sexo: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nombre: string;
        tel: string | null;
        ciudad: string | null;
        dni: string | null;
        sexo: string | null;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__ClientClient<({
        reservations: {
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
            last_modification: Date;
            reservedAt: Date;
            expiresAt: Date;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nombre: string;
        tel: string | null;
        ciudad: string | null;
        dni: string | null;
        sexo: string | null;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateClientDto: UpdateClientDto): import("@prisma/client").Prisma.Prisma__ClientClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nombre: string;
        tel: string | null;
        ciudad: string | null;
        dni: string | null;
        sexo: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__ClientClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nombre: string;
        tel: string | null;
        ciudad: string | null;
        dni: string | null;
        sexo: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
