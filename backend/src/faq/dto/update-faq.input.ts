import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha, IsOptional, Length } from 'class-validator';
import { Publish } from '../../prisma/publish-type.enum';

@InputType()
export class UpdateFaqInput {
  @Field((type) => Int)
  id: number;

  @Field()
  @IsAlpha()
  @Length(0, 255)
  titleBn: string;

  @Field()
  @IsAlpha()
  @Length(0, 255)
  titleEn: string;

  @Field()
  @IsAlpha()
  @Length(0, 255)
  descriptionBn: string;

  @Field()
  @IsAlpha()
  @Length(0, 255)
  descriptionEn: string;

  @Field(() => Publish, { defaultValue: Publish.NO })
  @IsOptional()
  isPublished?: keyof typeof Publish;
}
