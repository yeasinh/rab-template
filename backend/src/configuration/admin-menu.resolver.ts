import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { AdminMenu } from './models/admin-menu.model';
import { AdminMenuService } from './admin-menu.service';
import { CreateAdminMenuInput } from './dto/create-admin-menu.input';
import { UpdateAdminMenuInput } from './dto/update-admin-menu.input';

@Resolver(() => AdminMenu)
export class AdminMenuResolver {
  constructor(private readonly adminMenuService: AdminMenuService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => AdminMenu)
  async createAdminMenu(
    @Args('createAdminMenuInput') createAdminMenuInput: CreateAdminMenuInput,
  ) {
    return await this.adminMenuService.create(createAdminMenuInput);
  }

  @Query(() => [AdminMenu])
  @UseGuards(AuthGuard)
  async findAllAdminMenu(
    @Args('page') page: number,
    @Args('limit') limit: number,
  ) {
    return await this.adminMenuService.findAll(page, limit);
  }

  @Query(() => AdminMenu)
  @UseGuards(AuthGuard)
  async findOneAdminMenu(@Args('id') id: number) {
    return await this.adminMenuService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => AdminMenu)
  updateAdminMenu(
    @Args('updateAdminMenuInput') updateAdminMenuInput: UpdateAdminMenuInput,
  ) {
    return this.adminMenuService.update(
      updateAdminMenuInput.id,
      updateAdminMenuInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => AdminMenu)
  removeAdminMenu(@Args('id') id: number) {
    return this.adminMenuService.remove(id);
  }
}
