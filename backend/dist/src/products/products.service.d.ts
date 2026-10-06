import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    processImage(file: Express.Multer.File): Promise<string>;
    create(createProductDto: CreateProductDto): Promise<{
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
    }>;
    createMany(createProductDtos: CreateProductDto[]): Promise<Prisma.BatchPayload>;
    findAll(page?: number, limit?: number, search?: string, category?: string, condition?: string): Promise<{
        data: {
            stock: number;
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
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            price: number;
            image: string;
            category: string;
            condition: string;
            capacity: string | null;
            color: string | null;
        }[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    findOne(id: number): Promise<{
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
    }>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
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
    }>;
    remove(id: number): Promise<{
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
    }>;
}
