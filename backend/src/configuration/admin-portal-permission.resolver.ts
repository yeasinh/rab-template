import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { AdminPortalPermissionService } from './admin-portal-permission.service';
import { AdminPortalPermission } from './models/admin-portal-permission.model';
import { CreateAdminPortalPersmissionInput } from './dto/create-admin-portal-permission.input';
import { UpdateAdminPortalPersmissionInput } from './dto/update-admin-portal-permission';

@Resolver(() => AdminPortalPermission)
export class AdminPortalPermissionResolver {
  constructor(
    private readonly adminPortalPermissionService: AdminPortalPermissionService,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => AdminPortalPermission)
  async createAdminPortalPermission(
    @Args('createAdminPortalPersmissionInput')
    createAdminPortalPersmissionInput: CreateAdminPortalPersmissionInput,
  ) {
    return await this.adminPortalPermissionService.create(
      createAdminPortalPersmissionInput,
    );
  }

  @Query(() => [AdminPortalPermission])
  @UseGuards(AuthGuard)
  async findAllAdminPortalPermission(
    @Args('page') page: number,
    @Args('limit') limit: number,
  ) {
    return await this.adminPortalPermissionService.findAll(page, limit);
  }

  @Query(() => AdminPortalPermission)
  @UseGuards(AuthGuard)
  async findOneAdminPortalPermission(@Args('id') id: number) {
    return await this.adminPortalPermissionService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => AdminPortalPermission)
  updateAdminPortalPermission(
    @Args('updateAdminPortalPersmissionInput')
    updateAdminPortalPersmissionInput: UpdateAdminPortalPersmissionInput,
  ) {
    return this.adminPortalPermissionService.update(
      updateAdminPortalPersmissionInput.id,
      updateAdminPortalPersmissionInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => AdminPortalPermission)
  removeAdminPortalPermission(@Args('id') id: number) {
    return this.adminPortalPermissionService.remove(id);
  }
}
