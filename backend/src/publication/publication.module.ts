import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationResolver } from './publication.resolver';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    PublicationResolver,
    PublicationService,
    PrismaService,
    JwtService,
    ConfigService,
  ],
})
export class PublicationModule {}
