import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { Publication } from './models/publication.model';
import { PublicationService } from './publication.service';
import { CreatePublicationInput } from './dto/create-publication.input';
import { UpdatePublicationInput } from './dto/update-publication.input';

@Resolver(() => Publication)
export class PublicationResolver {
  constructor(private readonly publicationService: PublicationService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Publication)
  async createPublication(
    @Args('createPublicationInput')
    createPublicationInput: CreatePublicationInput,
  ) {
    return await this.publicationService.create(createPublicationInput);
  }

  @Query(() => [Publication])
  async findAllPublication(
    @Args('page') page: number,
    @Args('limit') limit: number,
  ) {
    return await this.publicationService.findAll(page, limit);
  }

  @Query(() => Publication)
  async findOnePublication(@Args('id') id: number) {
    return await this.publicationService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Publication)
  updatePublication(
    @Args('updatePublicationInput')
    updatePublicationInput: UpdatePublicationInput,
  ) {
    return this.publicationService.update(
      updatePublicationInput.id,
      updatePublicationInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Publication)
  removePublication(@Args('id') id: number) {
    return this.publicationService.remove(id);
  }
}
