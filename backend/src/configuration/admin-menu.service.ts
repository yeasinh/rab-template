import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAdminMenuInput } from './dto/create-admin-menu.input';
import { AdminMenu } from './models/admin-menu.model';
import { UpdateAdminMenuInput } from './dto/update-admin-menu.input';

@Injectable()
export class AdminMenuService {
  private logger = new Logger('Admin Menu Service');

  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async create(createAdminMenuInput: CreateAdminMenuInput): Promise<AdminMenu> {
    try {
      const adminMenuData: AdminMenu =
        await this.prismaService.adminMenus.create({
          data: { ...createAdminMenuInput },
        });
      this.logger.log(`Admin Menu data creation:${adminMenuData}`);
      return adminMenuData;
    } catch (e) {
      throw new HttpException(`Error creating Admin Menu: ${e}`, 500);
    }
  }

  async findAll(page, limit = 20): Promise<AdminMenu[]> {
    return await this.prismaService.adminMenus.findMany({ take: limit });
  }

  async findOne(id: number): Promise<AdminMenu> {
    return await this.prismaService.adminMenus.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateAdminMenuInput: UpdateAdminMenuInput,
  ): Promise<AdminMenu> {
    try {
      const isAdminMenuExist: AdminMenu = await this.findOne(id);
      if (isAdminMenuExist) {
        const updatedAdminMenuData = await this.prismaService.adminMenus.update(
          {
            data: {
              ...updateAdminMenuInput,
            },
            where: {
              id,
            },
          },
        );
        return updatedAdminMenuData;
      } else {
        throw new HttpException(`Admin Menu not exist`, HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error Updating Admin Menu: ${e}`, 500);
    }
  }

  async remove(id: number): Promise<AdminMenu> {
    try {
      const isAdminMenuExist: AdminMenu = await this.findOne(id);
      if (isAdminMenuExist) {
        await this.prismaService.adminMenus.delete({
          where: {
            id,
          },
        });
        return isAdminMenuExist;
      } else {
        throw new HttpException(`Admin Menu not exist`, HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error Deleting Admin Menu: ${e}`, 500);
    }
  }
}
