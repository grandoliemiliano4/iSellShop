import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    create(createClientDto: CreateClientDto): import("@prisma/client").Prisma.Prisma__ClientClient<{
        id: number;
        dni: string | null;
        ciudad: string | null;
        createdAt: Date;
        updatedAt: Date;
        nombre: string;
        tel: string | null;
        sexo: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        dni: string | null;
        ciudad: string | null;
        createdAt: Date;
        updatedAt: Date;
        nombre: string;
        tel: string | null;
        sexo: string | null;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ClientClient<({
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
            total: number | null;
            last_modification: Date;
            reservedAt: Date;
            expiresAt: Date;
        }[];
    } & {
        id: number;
        dni: string | null;
        ciudad: string | null;
        createdAt: Date;
        updatedAt: Date;
        nombre: string;
        tel: string | null;
        sexo: string | null;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateClientDto: UpdateClientDto): import("@prisma/client").Prisma.Prisma__ClientClient<{
        id: number;
        dni: string | null;
        ciudad: string | null;
        createdAt: Date;
        updatedAt: Date;
        nombre: string;
        tel: string | null;
        sexo: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__ClientClient<{
        id: number;
        dni: string | null;
        ciudad: string | null;
        createdAt: Date;
        updatedAt: Date;
        nombre: string;
        tel: string | null;
        sexo: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
