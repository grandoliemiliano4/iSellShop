import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.prisma.product.create({
      data: {
        ...createProductDto,
        image: createProductDto.image || '',
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
  ) {
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      // Exclude USADO products that have an active reservation
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

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        include: {
          reservations: {
            where: { status: 'Reservó' }
          }
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
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // Check if it exists first
    await this.findOne(id);
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    // Check if it exists first
    await this.findOne(id);
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
