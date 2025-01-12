import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginInput } from './dto/login.input';
import { Auth } from './models/auth.model';
import { AuthGuard } from 'src/shared/auth.guard';
import { ChangePasswordInput } from './dto/change-password.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async registerUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ) {
    return await this.usersService.create(createUserInput);
  }

  @UseGuards(AuthGuard)
  @Query(() => [User], { name: 'users' })
  async findAll(@Args('page') page: number, @Args('limit') limit: number) {
    return await this.usersService.findAll(page, limit);
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }
  @Mutation(() => User)
  forgotPassword(@Args('email') email: string) {
    return this.usersService.forgotPassword(email);
  }

  @Mutation(() => User)
  changePassword(
    @Args('changePasswordInput') changePasswordInput: ChangePasswordInput,
  ) {
    return this.usersService.changePassword(changePasswordInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @Mutation(() => Auth)
  async login(@Args('data') data: LoginInput) {
    return await this.usersService.login(data);
  }
}
