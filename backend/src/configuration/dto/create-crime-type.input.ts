import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsOptional, Length } from 'class-validator';
import { Publish } from '../../prisma/publish-type.enum';

@InputType()
export class CreateCrimeTypeInput {
  @Field()
  @IsAlpha()
  @Length(0, 255)
  nameBn: string;

  @Field()
  @IsAlpha()
  @Length(0, 255)
  nameEn: string;

  @Field(() => Publish, { defaultValue: Publish.NO })
  @IsOptional()
  isPublished?: keyof typeof Publish;
}
