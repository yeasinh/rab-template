import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { Permission } from './models/permission.model';
import { PermissionService } from './permission.service';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';

@Resolver(() => Permission)
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Permission)
  async createPermission(
    @Args('createPermissionInput') createPermissionInput: CreatePermissionInput,
  ) {
    return await this.permissionService.create(createPermissionInput);
  }

  @Query(() => [Permission])
  @UseGuards(AuthGuard)
  async findAllPermission(
    @Args('page') page: number,
    @Args('limit') limit: number,
  ) {
    return await this.permissionService.findAll(page, limit);
  }

  @Query(() => Permission)
  @UseGuards(AuthGuard)
  async findOnePermission(@Args('id') id: number) {
    return await this.permissionService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Permission)
  updatePermission(
    @Args('updatePermissionInput') updatePermissionInput: UpdatePermissionInput,
  ) {
    return this.permissionService.update(
      updatePermissionInput.id,
      updatePermissionInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Permission)
  removePermission(@Args('id') id: number) {
    return this.permissionService.remove(id);
  }
}
