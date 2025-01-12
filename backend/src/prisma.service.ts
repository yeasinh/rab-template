import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  [x: string]: any;
  async onModuleInit() {
    // Note: this is optional
    await this.$connect();
  }
}
