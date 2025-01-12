import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AdminPortalPermission } from './models/admin-portal-permission.model';
import { CreateAdminPortalPersmissionInput } from './dto/create-admin-portal-permission.input';
import { UpdateAdminPortalPersmissionInput } from './dto/update-admin-portal-permission';

@Injectable()
export class AdminPortalPermissionService {
  private logger = new Logger('Admin Portal Permission Service');

  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async create(
    createAdminPortalPersmissionInput: CreateAdminPortalPersmissionInput,
  ): Promise<AdminPortalPermission> {
    try {
      const adminPortalPermissionData: AdminPortalPermission =
        await this.prismaService.adminPortalPermissions.create({
          data: { ...createAdminPortalPersmissionInput },
        });
      this.logger.log(
        `Admin Portal Permission data creation:${adminPortalPermissionData}`,
      );
      return adminPortalPermissionData;
    } catch (e) {
      throw new HttpException(
        `Error creating Admin Portal Permission: ${e}`,
        500,
      );
    }
  }

  async findAll(page, limit = 20): Promise<AdminPortalPermission[]> {
    return await this.prismaService.adminPortalPermissions.findMany({
      take: limit,
    });
  }

  async findOne(id: number): Promise<AdminPortalPermission> {
    return await this.prismaService.adminPortalPermissions.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateAdminPortalPersmissionInput: UpdateAdminPortalPersmissionInput,
  ): Promise<AdminPortalPermission> {
    try {
      const isAdminPortalPersmissionExist: AdminPortalPermission =
        await this.findOne(id);
      if (isAdminPortalPersmissionExist) {
        const updatedAdminPortalPermissionData =
          await this.prismaService.adminPortalPermissions.update({
            data: {
              ...updateAdminPortalPersmissionInput,
            },
            where: {
              id,
            },
          });
        return updatedAdminPortalPermissionData;
      } else {
        throw new HttpException(
          `Admin Portal Permission not exist`,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      throw new HttpException(
        `Error Updating Admin Portal Permission: ${e}`,
        500,
      );
    }
  }

  async remove(id: number): Promise<AdminPortalPermission> {
    try {
      const isAdminPortalPersmissionExist: AdminPortalPermission =
        await this.findOne(id);
      if (isAdminPortalPersmissionExist) {
        await this.prismaService.adminPortalPermissions.delete({
          where: {
            id,
          },
        });
        return isAdminPortalPersmissionExist;
      } else {
        throw new HttpException(
          `Admin Portal Permission not exist`,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      throw new HttpException(
        `Error Deleting Admin Portal Permission: ${e}`,
        500,
      );
    }
  }
}
