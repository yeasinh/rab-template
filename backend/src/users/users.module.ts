import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from 'src/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     secret: configService.get('SECRET'),
    //     signOptions: {
    //       expiresIn: 3600,
    //     },
    //   }),
    // }),
  ],
  providers: [
    UsersResolver,
    UsersService,
    PrismaService,
    JwtService,
    ConfigService,
  ],
})
export class UserModule {}
