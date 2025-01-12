import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { AdminMenuResolver } from './admin-menu.resolver';
import { AdminMenuService } from './admin-menu.service';
import { PermissionResolver } from './permission.resolver';
import { PermissionService } from './permission.service';
import { AdminPortalPermissionResolver } from './admin-portal-permission.resolver';
import { AdminPortalPermissionService } from './admin-portal-permission.service';

@Module({
  providers: [
    AdminMenuResolver,
    AdminMenuService,
    PermissionResolver,
    PermissionService,
    AdminPortalPermissionResolver,
    AdminPortalPermissionService,
    PrismaService,
    JwtService,
    ConfigService,
  ],
})
export class ConfigurationModule {}
