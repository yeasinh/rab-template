import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha, IsOptional, Length } from 'class-validator';
import { Publish } from '../../prisma/publish-type.enum';

@InputType()
export class UpdatePoliceStationInput {
  @Field((type) => Int)
  id: number;

  @Field()
  @IsAlpha()
  @Length(0, 255)
  @IsOptional()
  titleBn?: string;

  @Field()
  @IsAlpha()
  @Length(0, 255)
  @IsOptional()
  titleEn?: string;

  @Field(() => Publish, { defaultValue: Publish.NO })
  @IsOptional()
  isPublished?: keyof typeof Publish;

  @Field((type) => Int)
  districtId: number;
}
