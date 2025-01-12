import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePermissionInput } from './dto/create-permission.input';
import { Permission } from './models/permission.model';
import { UpdatePermissionInput } from './dto/update-permission.input';

@Injectable()
export class PermissionService {
  private logger = new Logger('Permission Service');

  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async create(
    createPermissionInput: CreatePermissionInput,
  ): Promise<Permission> {
    try {
      const permissionData: Permission =
        await this.prismaService.permissons.create({
          data: { ...createPermissionInput },
        });
      this.logger.log(`Permission data creation:${permissionData}`);
      return permissionData;
    } catch (e) {
      throw new HttpException(`Error creating Permission: ${e}`, 500);
    }
  }

  async findAll(page, limit = 20): Promise<Permission[]> {
    return await this.prismaService.permissons.findMany({ take: limit });
  }

  async findOne(id: number): Promise<Permission> {
    return await this.prismaService.permissons.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updatePermissionInput: UpdatePermissionInput,
  ): Promise<Permission> {
    try {
      const isPermissionExist: Permission = await this.findOne(id);
      if (isPermissionExist) {
        const updatedPermissionData =
          await this.prismaService.permissons.update({
            data: {
              ...updatePermissionInput,
            },
            where: {
              id,
            },
          });
        return updatedPermissionData;
      } else {
        throw new HttpException(`Permission not exist`, HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error Updating Permission: ${e}`, 500);
    }
  }

  async remove(id: number): Promise<Permission> {
    try {
      const isPermissionExist: Permission = await this.findOne(id);
      if (isPermissionExist) {
        await this.prismaService.permissons.delete({
          where: {
            id,
          },
        });
        return isPermissionExist;
      } else {
        throw new HttpException(`Permission not exist`, HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error Deleting Permission: ${e}`, 500);
    }
  }
}
