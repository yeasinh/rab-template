import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha, IsOptional, Length } from 'class-validator';
import { Publish } from '../../prisma/publish-type.enum';

@InputType()
export class UpdatePhoneDirectoryInput {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  organogramWingId?: number;

  @Field({ nullable: true })
  battalionId?: number;

  @Field()
  recruitmentId?: number;

  @Field()
  @IsAlpha()
  @Length(0, 255)
  recruitmentNameBn?: string;

  @Field()
  @IsAlpha()
  @Length(0, 255)
  recruitmentNameEn?: string;

  @Field()
  email?: string;

  @Field()
  mobileNo?: string;

  @Field()
  phoneNo?: string;

  @Field(() => [Int])
  districtId?: number[];

  @Field(() => [String])
  districtNameEn?: string[];

  @Field(() => [String])
  districtNameBn?: string[];

  @Field(() => [Int])
  thanaId?: number[];

  @Field(() => [String])
  thanaNameEn?: string[];

  @Field(() => [String])
  thanaNameBn?: string[];

  @Field(() => Publish, { defaultValue: Publish.NO })
  @IsOptional()
  isPublished?: keyof typeof Publish;
}
