import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { extname } from 'path';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async processImage(file: Express.Multer.File): Promise<string> {
    const ext = extname(file.originalname).toLowerCase();
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

  async create(createProductDto: CreateProductDto) {
    const {
      imei, bateria, microfono, pantalla, camara_trasera, camara_frontal,
      parlante, face_id, bordes, descripcion_usado, garantia_hasta,
      ...productData
    } = createProductDto;

    if (productData.condition === 'USADO' && !imei) {
      throw new BadRequestException('El IMEI es obligatorio para equipos usados.');
    }

    return this.prisma.product.create({
      data: {
        ...productData,
        image: productData.image || '',
        ...(productData.condition === 'USADO' && {
          usedDetail: {
            create: {
              imei: imei!,
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

  async createMany(createProductDtos: CreateProductDto[]) {
    return this.prisma.product.createMany({
      data: createProductDtos.map(dto => ({
        ...dto,
        image: dto.image || '',
      })),
    });
  }

  async findAll(
    page: number = 1,
    limit: number = 12,
    search?: string,
    category?: string,
    condition?: string,
    minPrice?: number,
    maxPrice?: number,
    sortBy?: string
  ) {
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
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
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };
    if (sortBy === 'price_asc') {
      orderBy = { price: 'asc' };
    } else if (sortBy === 'price_desc') {
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

    // Calculate dynamic stock
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

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { usedDetail: true }
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // Check if it exists first
    await this.findOne(id);
    
    const {
      imei, bateria, microfono, pantalla, camara_trasera, camara_frontal,
      parlante, face_id, bordes, descripcion_usado, garantia_hasta,
      ...productData
    } = updateProductDto;

    if (productData.condition === 'USADO' && !imei) {
      throw new BadRequestException('El IMEI es obligatorio para equipos usados.');
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        ...(productData.condition === 'USADO' && {
          usedDetail: {
            upsert: {
              create: {
                imei: imei!,
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
        }).valueOf() ? {} : {} // If changing USADO to NUEVO we probably want to delete, but for now Prisma's cascade or ignore is safer.
        // Actually I won't delete it just in case, or I can safely do it. Let's just leave it as is if it changes to NUEVO.
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
