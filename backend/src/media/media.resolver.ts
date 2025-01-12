import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { Media } from './models/media.model';
import { MediaService } from './media.service';
import { CreateMediaInput } from './dto/create-media.input';
import { UpdateMediaInput } from './dto/update-media.input';

@Resolver(() => Media)
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Media)
  async createMedia(
    @Args('createMediaInput') createMediaInput: CreateMediaInput,
  ) {
    return await this.mediaService.create(createMediaInput);
  }

  @Query(() => [Media])
  async findAllMedia(@Args('page') page: number, @Args('limit') limit: number) {
    return await this.mediaService.findAll(page, limit);
  }

  @Query(() => Media)
  async findOneMedia(@Args('id') id: number) {
    return await this.mediaService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Media)
  updateMedia(@Args('updateMediaInput') updateMediaInput: UpdateMediaInput) {
    return this.mediaService.update(updateMediaInput.id, updateMediaInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Media)
  removeMedia(@Args('id') id: number) {
    return this.mediaService.remove(id);
  }
}
