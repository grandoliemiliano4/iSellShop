import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto, file: Express.Multer.File): Promise<{
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
    createMany(createProductDtos: CreateProductDto[]): Promise<import("@prisma/client").Prisma.BatchPayload>;
    findAll(page?: string, limit?: string, search?: string, category?: string, condition?: string, minPrice?: string, maxPrice?: string, sortBy?: string): Promise<{
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
                total: number | null;
                last_modification: Date;
                reservedAt: Date;
                expiresAt: Date;
            }[];
            usedDetail: {
                id: number;
                imei: string;
                bateria: number;
                microfono: boolean;
                pantalla: boolean;
                camara_trasera: boolean;
                camara_frontal: boolean;
                parlante: boolean;
                face_id: boolean;
                bordes: string;
                garantia_hasta: Date | null;
                descripcion: string | null;
                fecha_ingreso: Date;
                fecha_egreso: Date | null;
                productId: number;
            } | null;
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
    findOne(id: string): Promise<{
        usedDetail: {
            id: number;
            imei: string;
            bateria: number;
            microfono: boolean;
            pantalla: boolean;
            camara_trasera: boolean;
            camara_frontal: boolean;
            parlante: boolean;
            face_id: boolean;
            bordes: string;
            garantia_hasta: Date | null;
            descripcion: string | null;
            fecha_ingreso: Date;
            fecha_egreso: Date | null;
            productId: number;
        } | null;
    } & {
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
    update(id: string, updateProductDto: UpdateProductDto, file: Express.Multer.File): Promise<{
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
    remove(id: string): Promise<{
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
