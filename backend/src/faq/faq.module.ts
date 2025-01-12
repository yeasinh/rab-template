import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqResolver } from './faq.resolver';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    FaqResolver,
    FaqService,
    PrismaService,
    JwtService,
    ConfigService,
  ],
})
export class FaqModule {}
