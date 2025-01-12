import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { Faq } from './model/faq.model';
import { FaqService } from './faq.service';
import { CreateFaqInput } from './dto/create-faq.input';
import { UpdateFaqInput } from './dto/update-faq.input';

@Resolver(() => Faq)
export class FaqResolver {
  constructor(private readonly faqService: FaqService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Faq)
  async createFaq(@Args('createFaqInput') createFaqInput: CreateFaqInput) {
    return await this.faqService.create(createFaqInput);
  }

  @Query(() => [Faq])
  async findAllFaq(@Args('page') page: number, @Args('limit') limit: number) {
    return await this.faqService.findAll(page, limit);
  }

  @Query(() => Faq)
  async findOneFaq(@Args('id') id: number) {
    return await this.faqService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Faq)
  updateFaq(@Args('updateFaqInput') updateFaqInput: UpdateFaqInput) {
    return this.faqService.update(updateFaqInput.id, updateFaqInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Faq)
  removeFaq(@Args('id') id: number) {
    return this.faqService.remove(id);
  }
}
