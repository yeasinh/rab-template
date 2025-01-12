import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha, IsOptional, Length } from 'class-validator';
import { Publish } from '../../prisma/publish-type.enum';

@InputType()
export class CreatePoliceStationInput {
  @Field()
  @IsAlpha()
  @Length(0, 255)
  titleBn: string;

  @Field()
  @IsAlpha()
  @Length(0, 255)
  titleEn: string;

  @Field(() => Publish, { defaultValue: Publish.NO })
  @IsOptional()
  isPublished?: keyof typeof Publish;

  @Field((type) => Int)
  districtId: number;
}
