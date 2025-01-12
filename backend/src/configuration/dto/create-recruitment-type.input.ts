import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsOptional, Length } from 'class-validator';
import { Publish } from '../../prisma/publish-type.enum';
import { Unit } from 'src/prisma/unit-type.enum';

@InputType()
export class CreateRecruitmentTypeInput {
  @Field()
  @IsAlpha()
  @Length(0, 255)
  nameBn: string;

  @Field()
  @IsAlpha()
  @Length(0, 255)
  nameEn: string;

  @Field()
  order: number;

  @Field(() => Publish, { defaultValue: Publish.NO })
  @IsOptional()
  isPublished?: keyof typeof Publish;

  @Field(() => Unit, { defaultValue: Unit.BATTALION })
  @IsOptional()
  appliedFor?: keyof typeof Unit;
}
