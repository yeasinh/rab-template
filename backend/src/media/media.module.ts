import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaResolver } from './media.resolver';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    MediaResolver,
    MediaService,
    PrismaService,
    JwtService,
    ConfigService,
  ],
})
export class MediaModule {}
