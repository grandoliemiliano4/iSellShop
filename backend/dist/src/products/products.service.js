"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const path_1 = require("path");
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async processImage(file) {
        const ext = (0, path_1.extname)(file.originalname).toLowerCase();
        if (ext === '.heic' || ext === '.heif') {
            const heicConvert = require('heic-convert');
            const inputBuffer = fs.readFileSync(file.path);
            const outputBuffer = await heicConvert({
                buffer: inputBuffer,
                format: 'JPEG',
                quality: 0.8
            });
            const parsedPath = path.parse(file.filename);
            const newFilename = `${parsedPath.name}.jpg`;
            const newPath = path.join(file.destination, newFilename);
            fs.writeFileSync(newPath, outputBuffer);
            fs.unlinkSync(file.path);
            return `/uploads/${newFilename}`;
        }
        return `/uploads/${file.filename}`;
    }
    async create(createProductDto) {
        const { imei, bateria, microfono, pantalla, camara_trasera, camara_frontal, parlante, face_id, bordes, descripcion_usado, garantia_hasta, ...productData } = createProductDto;
        if (productData.condition === 'USADO' && !imei) {
            throw new common_1.BadRequestException('El IMEI es obligatorio para equipos usados.');
        }
        return this.prisma.product.create({
            data: {
                ...productData,
                image: productData.image || '',
                ...(productData.condition === 'USADO' && {
                    usedDetail: {
                        create: {
                            imei: imei,
                            bateria: bateria ?? 100,
                            microfono: microfono ?? true,
                            pantalla: pantalla ?? true,
                            camara_trasera: camara_trasera ?? true,
                            camara_frontal: camara_frontal ?? true,
                            parlante: parlante ?? true,
                            face_id: face_id ?? true,
                            bordes: bordes || 'NORMAL',
                            descripcion: descripcion_usado || null,
                            garantia_hasta: garantia_hasta ? new Date(garantia_hasta) : null,
                        }
                    }
                })
            },
        });
    }
    async createMany(createProductDtos) {
        return this.prisma.product.createMany({
            data: createProductDtos.map(dto => ({
                ...dto,
                image: dto.image || '',
            })),
        });
    }
    async findAll(page = 1, limit = 12, search, category, condition, minPrice, maxPrice, sortBy) {
        const skip = (page - 1) * limit;
        const where = {
            NOT: {
                AND: [
                    { condition: 'USADO' },
                    { reservations: { some: { status: 'Reservó' } } }
                ]
            }
        };
        if (search) {
            where.OR = [
                { name: { contains: search } },
                { description: { contains: search } },
            ];
        }
        if (category) {
            where.category = category;
        }
        if (condition) {
            where.condition = condition;
        }
        if (minPrice !== undefined || maxPrice !== undefined) {
            where.price = {};
            if (minPrice !== undefined)
                where.price.gte = minPrice;
            if (maxPrice !== undefined)
                where.price.lte = maxPrice;
        }
        let orderBy = { createdAt: 'desc' };
        if (sortBy === 'price_asc') {
            orderBy = { price: 'asc' };
        }
        else if (sortBy === 'price_desc') {
            orderBy = { price: 'desc' };
        }
        const [data, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                skip,
                take: limit,
                orderBy,
                include: {
                    reservations: {
                        where: { status: 'Reservó' }
                    },
                    usedDetail: true
                }
            }),
            this.prisma.product.count({ where }),
        ]);
        const mappedData = data.map((product) => {
            let finalStock = product.stock;
            if (product.condition === 'NUEVO') {
                finalStock = Math.max(0, product.stock - product.reservations.length);
            }
            return {
                ...product,
                stock: finalStock,
            };
        });
        return {
            data: mappedData,
            meta: {
                total,
                page,
                lastPage: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { usedDetail: true }
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async update(id, updateProductDto) {
        await this.findOne(id);
        const { imei, bateria, microfono, pantalla, camara_trasera, camara_frontal, parlante, face_id, bordes, descripcion_usado, garantia_hasta, ...productData } = updateProductDto;
        if (productData.condition === 'USADO' && !imei) {
            throw new common_1.BadRequestException('El IMEI es obligatorio para equipos usados.');
        }
        return this.prisma.product.update({
            where: { id },
            data: {
                ...productData,
                ...(productData.condition === 'USADO' && {
                    usedDetail: {
                        upsert: {
                            create: {
                                imei: imei,
                                bateria: bateria ?? 100,
                                microfono: microfono ?? true,
                                pantalla: pantalla ?? true,
                                camara_trasera: camara_trasera ?? true,
                                camara_frontal: camara_frontal ?? true,
                                parlante: parlante ?? true,
                                face_id: face_id ?? true,
                                bordes: bordes || 'NORMAL',
                                descripcion: descripcion_usado || null,
                                garantia_hasta: garantia_hasta ? new Date(garantia_hasta) : null,
                            },
                            update: {
                                ...(imei && { imei }),
                                ...(bateria !== undefined && { bateria }),
                                ...(microfono !== undefined && { microfono }),
                                ...(pantalla !== undefined && { pantalla }),
                                ...(camara_trasera !== undefined && { camara_trasera }),
                                ...(camara_frontal !== undefined && { camara_frontal }),
                                ...(parlante !== undefined && { parlante }),
                                ...(face_id !== undefined && { face_id }),
                                ...(bordes && { bordes }),
                                ...(descripcion_usado !== undefined && { descripcion: descripcion_usado }),
                                ...(garantia_hasta !== undefined && { garantia_hasta: garantia_hasta ? new Date(garantia_hasta) : null }),
                            }
                        }
                    }
                }),
                ...(productData.condition === 'NUEVO' && {
                    usedDetail: {
                        delete: true
                    }
                }).valueOf() ? {} : {}
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.product.delete({
            where: { id },
        });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map