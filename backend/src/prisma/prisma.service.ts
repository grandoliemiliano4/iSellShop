import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const url =
      process.env.DATABASE_URL || 'mysql://root:root@localhost:3306/test';
    // PrismaMariaDb adapter directly accepts a connection string
    const adapter = new PrismaMariaDb(url);
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
